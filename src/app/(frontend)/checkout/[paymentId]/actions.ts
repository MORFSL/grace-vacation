'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Checkout } from '@/payload-types'
import { getSignedParameters, mapCurrencyCode } from '@/utilities/cybersource/signature'
import { getServerSideURL } from '@/utilities/getURL'

export async function processPayment(
  paymentId: string,
  formData: FormData,
): Promise<{ error?: string; cybersourceUrl?: string; formParams?: Record<string, string> }> {
  try {
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

    if (!payment) {
      return { error: 'Payment link not found' }
    }

    if (payment.status === 'completed') {
      return { error: 'This payment has already been completed' }
    }

    const customerName = formData.get('customerName') as string
    const customerEmail = formData.get('customerEmail') as string
    const customerPhone = formData.get('customerPhone') as string

    if (!customerEmail) {
      return { error: 'Customer email is required' }
    }

    const checkoutConfig = (await getCachedGlobal('checkout')()) as Checkout

    if (
      !checkoutConfig.checkoutMerchantId ||
      !checkoutConfig.checkoutAccessKey ||
      !checkoutConfig.checkoutSecretKey ||
      !checkoutConfig.checkoutUrl
    ) {
      return { error: 'Payment gateway configuration is incomplete. Please contact support.' }
    }

    // Update payment with customer information
    await payload.update({
      collection: 'payments',
      id: payment.id,
      data: {
        customerName: customerName || null,
        customerEmail,
        customerPhone: customerPhone || null,
      },
      overrideAccess: true,
    })

    const currencyCode = mapCurrencyCode(checkoutConfig.currencyCode || 'USD')

    const signedParams = getSignedParameters(
      paymentId,
      payment.amount,
      currencyCode,
      checkoutConfig.checkoutMerchantId,
      checkoutConfig.checkoutAccessKey,
      checkoutConfig.checkoutSecretKey,
    )

    // Set callback URL - CyberSource will POST payment result here
    const serverUrl = getServerSideURL()
    signedParams.override_custom_receipt_page = `${serverUrl}/checkout/${paymentId}/callback`
    signedParams.override_custom_cancel_page = `${serverUrl}/checkout/${paymentId}/callback`

    if (customerName) signedParams.bill_to_forename = customerName
    if (customerName) signedParams.bill_to_surname = customerName
    if (customerEmail) signedParams.bill_to_email = customerEmail
    if (customerPhone) signedParams.bill_to_phone = customerPhone

    revalidatePath(`/checkout/${paymentId}`)

    // Redirect to CyberSource hosted checkout
    return {
      cybersourceUrl: checkoutConfig.checkoutUrl,
      formParams: signedParams,
    }
  } catch (error) {
    console.error('Error processing payment:', error)
    return { error: 'An error occurred while processing your payment' }
  }
}
