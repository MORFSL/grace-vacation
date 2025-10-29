import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
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

  if (!paymentData) {
    notFound()
  }

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(paymentData.amount)

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Payment Checkout</h1>

        <div className="mb-8">
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Amount Due:</span>
              <span className="text-2xl font-bold text-primary">{formattedAmount}</span>
            </div>
          </div>
        </div>

        <CheckoutForm paymentId={paymentId} amount={paymentData.amount} />
      </div>
    </div>
  )
}
