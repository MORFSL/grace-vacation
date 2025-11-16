import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Checkout } from '@/payload-types'

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

  return result.docs?.[0] || null
}

export default async function SuccessPage({ params }: PageProps) {
  const { paymentId } = await params
  const payment = await getPaymentData(paymentId)
  const checkoutConfig = (await getCachedGlobal('checkout')()) as Checkout

  if (!payment) {
    notFound()
  }

  if (payment.status !== 'completed') {
    redirect(`/checkout/${paymentId}`)
  }

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: checkoutConfig.currencyCode || 'USD',
  }).format(payment.amount)

  return (
    <div className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-xl px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold">Payment Successful</h2>
          <p className="mt-2 text-muted-foreground">
            Your payment of {formattedAmount} has been processed successfully. A receipt has been
            sent to your email.
          </p>
          <div className="mt-6">
            <Button asChild variant="default" className="no-underline">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
