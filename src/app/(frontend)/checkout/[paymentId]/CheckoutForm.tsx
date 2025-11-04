'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { processPayment } from './actions'
import { CheckCircle, Lock } from 'lucide-react'

interface CheckoutFormProps {
  paymentId: string
  amount: number
}

export function CheckoutForm({ paymentId }: CheckoutFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    setError(null)

    startTransition(async () => {
      const result = await processPayment(paymentId, formData)

      if (result.error) {
        setError(result.error)
        return
      }

      if (result.cybersourceUrl && result.formParams) {
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = result.cybersourceUrl

        Object.entries(result.formParams).forEach(([key, value]) => {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = value
          form.appendChild(input)
        })

        document.body.appendChild(form)
        form.submit()
      }
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

      <div className="rounded-md border border-border bg-muted p-4 text-muted-foreground">
        <div className="flex items-start gap-3">
          <Lock className="mt-0.5 h-4 w-4" />
          <p className="text-xs leading-5">
            A payment receipt will be automatically sent to your email once the transaction is
            completed.
          </p>
        </div>
      </div>

      <div className="pt-1">
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            'Processing Payment...'
          ) : (
            <span className="inline-flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Pay Now
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}
