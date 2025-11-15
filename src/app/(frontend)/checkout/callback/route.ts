import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Checkout } from '@/payload-types'
import { verifySignature } from '@/utilities/cybersource/signature'
import { revalidatePath } from 'next/cache'
import { getClientSideURL } from '@/utilities/getURL'

interface CyberSourceResponse {
  signed_field_names: string
  signed_date_time: string
  signature: string
  decision: string
  reason_code: string
  message: string
  req_bill_to_forename: string
  req_bill_to_surname: string
  req_bill_to_email: string
  req_bill_to_phone: string
  req_reference_number: string
  req_bill_to_address_city: string
  req_bill_to_address_line1: string
  req_bill_to_address_country: string
  [key: string]: string | undefined
}

async function getPaymentData(paymentId: string) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'payments',
    where: {
      linkId: {
        equals: paymentId,
      },
    },
    limit: 1,
    pagination: false,
    overrideAccess: true,
  })

  return result.docs?.[0] || null
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const responseData: CyberSourceResponse = {
      req_reference_number: '',
      signed_field_names: '',
      signed_date_time: '',
      signature: '',
      decision: '',
      reason_code: '',
      message: '',
      req_bill_to_forename: '',
      req_bill_to_surname: '',
      req_bill_to_email: '',
      req_bill_to_phone: '',
      req_bill_to_address_city: '',
      req_bill_to_address_line1: '',
      req_bill_to_address_country: '',
    }

    formData.forEach((value, key) => {
      responseData[key] = value.toString()
    })

    const paymentId = responseData.req_reference_number
    if (!paymentId) {
      return NextResponse.redirect(
        new URL(`${getClientSideURL()}/checkout/failure?error=Invalid+response`, request.url),
        301,
      )
    }

    const checkoutConfig = (await getCachedGlobal('checkout')()) as Checkout
    const secretKey = checkoutConfig.checkoutSecretKey

    if (!secretKey) {
      return NextResponse.redirect(
        new URL(`${getClientSideURL()}/checkout/failure?error=Configuration+error`, request.url),
        301,
      )
    }

    const receivedSignature = responseData.signature
    if (!receivedSignature || !responseData.signed_field_names || !responseData.signed_date_time) {
      return NextResponse.redirect(
        new URL(`${getClientSideURL()}/checkout/failure?error=Invalid+response`, request.url),
        301,
      )
    }

    // Extract fields to verify
    const signedFields = responseData.signed_field_names.split(',')
    const paramsToVerify: Record<string, string> = {}
    signedFields.forEach((field) => {
      if (responseData[field]) {
        paramsToVerify[field] = responseData[field]!
      }
    })

    const isValid = verifySignature(paramsToVerify, secretKey, receivedSignature)

    if (!isValid) {
      return NextResponse.redirect(
        new URL(
          `${getClientSideURL()}/checkout/failure?error=Signature+verification+failed`,
          request.url,
        ),
        301,
      )
    }

    const decision = responseData.decision
    const payment = await getPaymentData(paymentId)

    if (!payment) {
      return NextResponse.redirect(
        new URL(`${getClientSideURL()}/checkout/failure?error=Payment+not+found`, request.url),
        301,
      )
    }

    const payload = await getPayload({ config: configPromise })

    if (decision === 'ACCEPT') {
      await payload.update({
        collection: 'payments',
        id: payment.id,
        data: {
          status: 'completed',
          response: responseData,
          paidAt: new Date().toISOString(),
          customerName: responseData.req_bill_to_forename + ' ' + responseData.req_bill_to_surname,
          customerEmail: responseData.req_bill_to_email,
          customerPhone: responseData.req_bill_to_phone,
        },
        overrideAccess: true,
      })

      revalidatePath(`/checkout/${paymentId}`)
      revalidatePath(`/checkout/${paymentId}/success`)

      return NextResponse.redirect(
        new URL(`${getClientSideURL()}/checkout/${paymentId}/success`, request.url),
        301,
      )
    } else {
      await payload.update({
        collection: 'payments',
        id: payment.id,
        data: {
          status: 'failed',
          response: responseData,
        },
        overrideAccess: true,
      })

      revalidatePath(`/checkout/${paymentId}`)
      revalidatePath(`/checkout/failure`)

      const errorMessage = responseData.message || 'Payment failed'
      return NextResponse.redirect(
        new URL(
          `${getClientSideURL()}/checkout/failure?error=${encodeURIComponent(errorMessage)}`,
          request.url,
        ),
        301,
      )
    }
  } catch {
    return NextResponse.redirect(
      new URL(`${getClientSideURL()}/checkout/failure?error=Internal+error`, request.url),
      301,
    )
  }
}
