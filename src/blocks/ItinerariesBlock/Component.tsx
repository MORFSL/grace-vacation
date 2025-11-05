import React from 'react'

import type { Itinerary, ItinerariesBlock as ItinerariesBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const ItinerariesBlock: React.FC<
  ItinerariesBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    destinations,
    richText,
    link,
    enableLink,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
  } = props

  const limit = limitFromProps || 3

  let itineraries: Itinerary[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedDestinations = destinations?.map((destination) => {
      if (typeof destination === 'object') return destination.id
      else return destination
    })

    const fetchedItineraries = await payload.find({
      collection: 'itineraries',
      depth: 1,
      limit,
      ...(flattenedDestinations && flattenedDestinations.length > 0
        ? {
            where: {
              destination: {
                in: flattenedDestinations,
              },
            },
          }
        : {}),
    })

    itineraries = fetchedItineraries.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedItineraries = selectedDocs.map((itinerary) => {
        if (typeof itinerary.value === 'object') return itinerary.value
      }) as Itinerary[]

      itineraries = filteredSelectedItineraries
    }
  }

  return (
    <section className="mx-auto container" id={`block-${id}`}>
      {richText && (
        <div
          className={cn(
            'mb-10 flex flex-col md:flex-row gap-4',
            enableLink && link ? 'md:justify-between' : 'justify-center',
          )}
        >
          <RichText
            className="mx-0 prose-headings:mb-0 text-center md:text-start"
            data={richText}
            enableGutter={false}
          />
          {enableLink && link && <CMSLink className="w-fit mx-auto md:mx-0" {...link} />}
        </div>
      )}
      <CollectionArchive itineraries={itineraries} />
    </section>
  )
}
