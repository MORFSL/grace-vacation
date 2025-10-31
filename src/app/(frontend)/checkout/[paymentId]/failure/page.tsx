import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Checkout } from '@/payload-types'

interface PageProps {
  params: Promise<{ paymentId: string }>
  searchParams: Promise<{ error?: string }>
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

export default async function FailurePage({ params, searchParams }: PageProps) {
  const { paymentId } = await params
  const { error } = await searchParams
  const payment = await getPaymentData(paymentId)
  const checkoutConfig = (await getCachedGlobal('checkout')()) as Checkout

  if (!payment) {
    notFound()
  }

  if (payment.status === 'completed') {
    redirect(`/checkout/${paymentId}/success`)
  }

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: checkoutConfig.currencyCode || 'USD',
  }).format(payment.amount)

  const errorMessage =
    error ||
    'We encountered an issue processing your payment. Please try again or contact support if the problem persists.'

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto max-w-xl px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <XCircle className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold">Payment Failed</h2>
          <p className="mt-2 text-muted-foreground">
            Your payment of {formattedAmount} could not be processed.
          </p>
          <div className="mt-4 rounded-md border border-red-500/30 bg-red-300/20 p-4 text-sm text-destructive">
            <p>{errorMessage}</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="outline" className="no-underline">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild variant="default" className="no-underline">
              <Link href={`/checkout/${paymentId}`}>Retry Payment</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
