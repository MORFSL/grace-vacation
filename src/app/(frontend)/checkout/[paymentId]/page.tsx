import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Checkout } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import CheckoutCard from './CheckoutCard'
import { CheckoutForm } from './CheckoutForm'

interface PageProps {
  params: Promise<{ paymentId: string }>
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

  const payment = result.docs?.[0]

  if (!payment) {
    return null
  }

  if (payment.status === 'completed') {
    redirect(`/checkout/${paymentId}/success`)
  }

  return {
    linkId: payment.linkId,
    amount: payment.amount,
    status: payment.status,
  }
}

export default async function CheckoutPage({ params }: PageProps) {
  const { paymentId } = await params

  const paymentData = await getPaymentData(paymentId)
  const checkoutConfig = (await getCachedGlobal('checkout')()) as Checkout

  if (!paymentData) {
    notFound()
  }

  return (
    <CheckoutCard amount={paymentData.amount} currencyCode={checkoutConfig.currencyCode}>
      <CheckoutForm paymentId={paymentId} amount={paymentData.amount} />
    </CheckoutCard>
  )
}
