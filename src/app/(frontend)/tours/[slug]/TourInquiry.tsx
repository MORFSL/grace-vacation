'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { General, Itinerary } from '@/payload-types'
import { Suspense, useEffect, useState } from 'react'
import { getClientSideURL } from '@/utilities/getURL'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { Skeleton } from '@/components/ui/skeleton'
import { FormBlockClient } from '@/blocks/Form/Component.client'

interface Props {
  itinerary: Itinerary
  general: General
}

export const TourInquiry = ({ itinerary, general }: Props) => {
  const [form, setForm] = useState<FormType | null>(null)
  const [loading, setLoading] = useState(true)
  const inquiryFormID =
    general?.itinerary?.inquiryForm && typeof general?.itinerary?.inquiryForm === 'object'
      ? general?.itinerary?.inquiryForm?.id
      : '1'

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const baseUrl = getClientSideURL()
        const response = await fetch(
          `${baseUrl}/api/forms/${inquiryFormID}?depth=2&draft=false&trash=false`,
        )
        const data = (await response.json()) as FormType
        data.fields.forEach((field) => {
          if ('name' in field && field.name?.includes('itinerary')) {
            field.defaultValue = itinerary.title
          }
        })
        setForm(data)
      } catch (error) {
        console.error('Error fetching form:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchForm()
  }, [inquiryFormID, itinerary.title])

  if (!itinerary.price) {
    return null
  }

  return (
    <div
      className="my-6 bg-muted border border-primary/10 rounded-xl p-6 text-center"
      style={{
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, .05)',
      }}
    >
      <h2 className="font-medium text-muted-foreground">{general?.itinerary?.pricePrefix}</h2>

      <div className="mt-1 text-2xl font-bold">
        <span className="font-semibold">
          {general?.payments?.currencyLabel} {itinerary.price}
        </span>
        {itinerary.priceType && (
          <span className="text-muted-foreground font-medium">
            /<span className="text-lg">{itinerary.priceType}</span>
          </span>
        )}
      </div>
      <p className="mt-2 text-sm">{itinerary.duration}</p>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6 w-full">Make An Inquiry</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] p-0 gap-0">
          <DialogHeader className="pt-6 px-4 lg:px-6">
            <DialogTitle>Tour Inquiry</DialogTitle>
            <DialogDescription>
              Have questions about this tour? Send us an inquiry.
            </DialogDescription>
          </DialogHeader>
          {form ? (
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <FormBlockClient enableIntro={false} form={form} />
            </Suspense>
          ) : (
            <p className="text-sm text-muted-foreground">Failed to load form.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
