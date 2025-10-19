import React from 'react'

import type { Itinerary, ItinerariesBlock as ItinerariesBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ItinerariesBlock: React.FC<
  ItinerariesBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, destinations, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

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
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive itineraries={itineraries} />
    </div>
  )
}
