import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ paymentId: string }>
}

async function getPaymentData(paymentId: string) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'payments' as any,
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

export default async function SuccessPage({ params }: PageProps) {
  const { paymentId } = await params
  const payment = await getPaymentData(paymentId)

  if (!payment) {
    notFound()
  }

  // If payment is not completed, redirect back to checkout
  if (payment.status !== 'completed') {
    redirect(`/checkout/${paymentId}`)
  }

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(payment.amount)

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-md text-center">
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p className="mb-4">Your payment of {formattedAmount} has been processed successfully.</p>
        <p className="text-sm mb-4">A receipt has been sent to your email address.</p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
