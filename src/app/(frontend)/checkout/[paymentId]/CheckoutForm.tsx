'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { processPayment } from './actions'

interface CheckoutFormProps {
  paymentId: string
  amount: number
}

export function CheckoutForm({ paymentId, amount }: CheckoutFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  async function handleSubmit(formData: FormData) {
    setError(null)

    startTransition(async () => {
      const result = await processPayment(paymentId, formData)

      if (result.error) {
        setError(result.error)
      }
      // If successful, redirect happens in the server action
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">{error}</div>
      )}

      <div>
        <Label htmlFor="customerName">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="customerName"
          name="customerName"
          type="text"
          required
          className="mt-1"
          disabled={isPending}
        />
      </div>

      <div>
        <Label htmlFor="customerEmail">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="customerEmail"
          name="customerEmail"
          type="email"
          required
          className="mt-1"
          disabled={isPending}
        />
      </div>

      <div>
        <Label htmlFor="customerPhone">Phone</Label>
        <Input
          id="customerPhone"
          name="customerPhone"
          type="tel"
          className="mt-1"
          disabled={isPending}
        />
      </div>

      <div className="pt-4">
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? 'Processing Payment...' : `Pay Now`}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mt-6 text-center">
        Your payment will be processed securely. A receipt will be sent to your email address upon
        completion.
      </p>
    </form>
  )
}
