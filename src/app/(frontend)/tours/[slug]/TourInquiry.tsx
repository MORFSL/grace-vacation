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
import { FormBlock } from '@/blocks/Form/Component'
import { useEffect, useState } from 'react'
import { getClientSideURL } from '@/utilities/getURL'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

interface Props {
  itinerary: Itinerary
  general: General
}

export const TourInquiry = ({ itinerary, general }: Props) => {
  const [form, setForm] = useState<FormType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const baseUrl = getClientSideURL()
        const response = await fetch(
          `${baseUrl}/api/forms/3?depth=2&draft=false&locale=undefined&trash=false`,
        )
        const data = (await response.json()) as FormType
        data.fields.forEach((field) => {
          if (field.blockType == 'hidden' && field.name == 'itineraryName') {
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
  }, [])

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
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tour Inquiry</DialogTitle>
            <DialogDescription>
              Fill out the form below to inquire about this tour.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading form...</p>
            ) : form ? (
              <FormBlock enableIntro={false} form={form} />
            ) : (
              <p className="text-sm text-muted-foreground">Failed to load form.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
