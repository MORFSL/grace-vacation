import { ShieldCheck } from 'lucide-react'

interface CheckoutCardProps {
  amount: number
  currencyCode?: string | null
  children: React.ReactNode
}

export default function CheckoutCard({ amount, currencyCode, children }: CheckoutCardProps) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode || 'USD',
  }).format(amount)

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto max-w-xl px-4 py-12">
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Payment</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Pay online to confirm your booking.
          </p>
        </header>

        <div className="rounded-2xl border border-border bg-card shadow-xl">
          <div className="rounded-t-2xl bg-muted p-6 text-primary">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-semibold tracking-wide/relaxed text-primary">Amount Due</p>
                <p className="mt-1 text-3xl font-bold sm:text-4xl text-primary">
                  {formattedAmount}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-md border border-primary-foreground/20 bg-white/10 px-2.5 py-1.5 text-xs font-medium">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
