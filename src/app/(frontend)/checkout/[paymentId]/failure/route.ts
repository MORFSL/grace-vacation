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
  [key: string]: string | undefined
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> },
) {
  try {
    const { paymentId } = await params
    const formData = await request.formData()

    // Convert FormData to object
    const responseData: CyberSourceResponse = {}
    formData.forEach((value, key) => {
      responseData[key] = value.toString()
    })

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
    if (receivedSignature && responseData.signed_field_names && responseData.signed_date_time) {
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
        // Continue to failure page anyway
      }
    }

    // Update payment status
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

    const payment = result.docs?.[0]

    if (payment) {
      // Store full response and mark as failed
      await payload.update({
        collection: 'payments',
        id: payment.id,
        data: {
          status: 'failed',
          response: responseData,
        },
        overrideAccess: true,
      })
    }

    revalidatePath(`/checkout/${paymentId}`)
    revalidatePath(`/checkout/${paymentId}/failure`)

    // Redirect to failure page with error message
    const errorMessage = responseData.message || 'Payment failed'
    return NextResponse.redirect(
      new URL(`/checkout/${paymentId}/failure?error=${encodeURIComponent(errorMessage)}`, request.url),
    )
  } catch (error) {
    console.error('Error processing CyberSource callback:', error)
    return NextResponse.redirect(
      new URL(`/checkout/${paymentId}/failure?error=Internal+error`, request.url),
    )
  }
}

