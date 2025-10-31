import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Checkout } from '@/payload-types'
import { verifySignature } from '@/utilities/cybersource/signature'
import { revalidatePath } from 'next/cache'

interface CyberSourceResponse {
  signed_field_names?: string
  signed_date_time?: string
  signature?: string
  decision?: string
  reason_code?: string
  message?: string
  reference_number?: string
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

    // Convert FormData to object
    const responseData: CyberSourceResponse = {}
    formData.forEach((value, key) => {
      responseData[key] = value.toString()
    })

    // Get paymentId from Cybersource response reference_number
    const paymentId = responseData.reference_number
    if (!paymentId) {
      console.error('Missing reference_number in CyberSource response')
      return NextResponse.redirect(new URL('/checkout/failure?error=Invalid+response', request.url))
    }

    // Get the secret key from checkout config
    const checkoutConfig = (await getCachedGlobal('checkout')()) as Checkout
    const secretKey = checkoutConfig.checkoutSecretKey

    if (!secretKey) {
      console.error('Secret key not found in checkout config')
      return NextResponse.redirect(
        new URL(`/checkout/${paymentId}/failure?error=Configuration+error`, request.url),
      )
    }

    // Verify signature
    const receivedSignature = responseData.signature
    if (!receivedSignature || !responseData.signed_field_names || !responseData.signed_date_time) {
      console.error('Missing required signature fields')
      return NextResponse.redirect(
        new URL(`/checkout/${paymentId}/failure?error=Invalid+response`, request.url),
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
      console.error('Signature verification failed')
      return NextResponse.redirect(
        new URL(`/checkout/${paymentId}/failure?error=Signature+verification+failed`, request.url),
      )
    }

    // Check transaction result
    const decision = responseData.decision

    // Get payment record
    const payment = await getPaymentData(paymentId)

    if (!payment) {
      return NextResponse.redirect(
        new URL(`/checkout/${paymentId}/failure?error=Payment+not+found`, request.url),
      )
    }

    // Handle success or failure based on decision
    const payload = await getPayload({ config: configPromise })

    if (decision === 'ACCEPT') {
      // Update payment as completed
      await payload.update({
        collection: 'payments',
        id: payment.id,
        data: {
          status: 'completed',
          response: responseData,
          paidAt: new Date().toISOString(),
        },
        overrideAccess: true,
      })

      revalidatePath(`/checkout/${paymentId}`)
      revalidatePath(`/checkout/${paymentId}/success`)

      // Redirect to success page
      return NextResponse.redirect(new URL(`/checkout/${paymentId}/success`, request.url))
    } else {
      // Update payment as failed
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
      revalidatePath(`/checkout/${paymentId}/failure`)

      // Redirect to failure page with error message
      const errorMessage = responseData.message || 'Payment failed'
      return NextResponse.redirect(
        new URL(
          `/checkout/${paymentId}/failure?error=${encodeURIComponent(errorMessage)}`,
          request.url,
        ),
      )
    }
  } catch (error) {
    console.error('Error processing CyberSource callback:', error)
    // Try to get paymentId from error context if available, otherwise redirect to generic failure
    return NextResponse.redirect(new URL('/checkout/failure?error=Internal+error', request.url))
  }
}
