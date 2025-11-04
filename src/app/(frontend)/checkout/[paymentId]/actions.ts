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
    const billToAddressCity = formData.get('billToAddressCity') as string
    const billToAddressCountry = formData.get('billToAddressCountry') as string
    const billToAddressLine1 = (formData.get('billToAddressLine1') as string)
      ?.replace(/\s+/g, ' ')
      .trim()

    if (!customerEmail) {
      return { error: 'Customer email is required' }
    }

    const checkoutConfig = (await getCachedGlobal('checkout')()) as Checkout

    if (
      !checkoutConfig.checkoutProfileId ||
      !checkoutConfig.checkoutAccessKey ||
      !checkoutConfig.checkoutSecretKey ||
      !checkoutConfig.checkoutUrl
    ) {
      return { error: 'Payment gateway configuration is incomplete. Please contact support.' }
    }

    const currencyCode = mapCurrencyCode(checkoutConfig.currencyCode || 'USD')

    const serverUrl = getServerSideURL()
    const callbackUrl = `${serverUrl}/checkout/callback`

    const signedParams = getSignedParameters(
      paymentId,
      payment.amount,
      currencyCode,
      checkoutConfig.checkoutProfileId,
      checkoutConfig.checkoutAccessKey,
      checkoutConfig.checkoutSecretKey,
      {
        receiptPageUrl: callbackUrl,
        cancelPageUrl: callbackUrl,
        billToForename: customerName.split(' ')[0] || undefined,
        billToSurname: customerName.split(' ')[1] || undefined,
        billToEmail: customerEmail || undefined,
        billToPhone: customerPhone || undefined,
        billToAddressLine1: billToAddressLine1 || undefined,
        billToAddressCity: billToAddressCity || undefined,
        billToAddressCountry: billToAddressCountry || undefined,
      },
    )

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
