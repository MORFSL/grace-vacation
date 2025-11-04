'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Combobox } from '@/components/ui/combobox'
import { countryOptions } from '@/blocks/Form/Country/options'
import { processPayment } from './actions'
import { CheckCircle, Lock } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface CheckoutFormProps {
  paymentId: string
  amount: number
}

export function CheckoutForm({ paymentId }: CheckoutFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [country, setCountry] = useState<string>('')

  async function handleSubmit(formData: FormData) {
    setError(null)

    if (!country) {
      setError('Please select a country')
      return
    }

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
        <Label htmlFor="customerPhone">
          Phone <span className="text-destructive">*</span>
        </Label>
        <Input
          id="customerPhone"
          name="customerPhone"
          type="tel"
          className="mt-1"
          disabled={isPending}
          required
        />
      </div>

      <div>
        <Label htmlFor="billToAddressLine1">
          Address <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="billToAddressLine1"
          name="billToAddressLine1"
          required
          className="mt-1"
          disabled={isPending}
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="billToAddressCity">
          City <span className="text-destructive">*</span>
        </Label>
        <Input
          id="billToAddressCity"
          name="billToAddressCity"
          type="text"
          required
          className="mt-1"
          disabled={isPending}
        />
      </div>

      <div>
        <Label htmlFor="billToAddressCountry">
          Country <span className="text-destructive">*</span>
        </Label>
        <input type="hidden" name="billToAddressCountry" value={country} />
        <div className="mt-1">
          <Combobox
            options={countryOptions}
            value={country}
            onValueChange={setCountry}
            placeholder="Select a country"
            searchPlaceholder="Search countries..."
            disabled={isPending}
          />
        </div>
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
