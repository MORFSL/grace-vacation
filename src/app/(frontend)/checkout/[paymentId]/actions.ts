'use server'

import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'

export async function processPayment(
  paymentId: string,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
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

    await payload.update({
      collection: 'payments',
      id: payment.id,
      data: {
        customerName: customerName || null,
        customerEmail,
        customerPhone: customerPhone || null,
        status: 'completed',
        response: {
          status: 'success',
          message: 'Payment processed successfully (simulated)',
          processedAt: new Date().toISOString(),
        },
        paidAt: new Date().toISOString(),
      },
      overrideAccess: true,
    })

    revalidatePath(`/checkout/${paymentId}`)

    redirect(`/checkout/${paymentId}/success`)
  } catch (error) {
    console.error('Error processing payment:', error)
    return { error: 'An error occurred while processing your payment' }
  }
}
