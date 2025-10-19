import React from 'react'

import type { Itinerary, ItinerariesBlock as ItinerariesBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { CMSLink } from '@/components/Link'

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
    limit: limitFromProps,
    populateBy,
    selectedDocs,
  } = props

  const limit = limitFromProps || 3

  let itineraries: Itinerary[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedDestinations = destinations?.map((destination: any) => {
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
      const filteredSelectedItineraries = selectedDocs.map((itinerary: any) => {
        if (typeof itinerary.value === 'object') return itinerary.value
      }) as Itinerary[]

      itineraries = filteredSelectedItineraries
    }
  }

  return (
    <section className="mx-auto container" id={`block-${id}`}>
      <div className="mb-16 flex justify-between items-center">
        {richText && (
          <RichText
            className="ms-0 max-w-[48rem] prose-headings:mb-0"
            data={richText}
            enableGutter={false}
          />
        )}
        {link && <CMSLink {...link} />}
      </div>
      <CollectionArchive itineraries={itineraries} />
    </section>
  )
}
