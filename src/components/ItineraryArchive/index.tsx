import React from 'react'

import { Card } from '@/components/Card'

import type { Itinerary as ItineraryType } from '@/payload-types'

export type Props = {
  itineraries: ItineraryType[]
}

export const ItineraryArchive: React.FC<Props> = (props) => {
  const { itineraries } = props

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {itineraries?.map((itinerary, index) => {
        if (itinerary && typeof itinerary === 'object') {
          return (
            <Card
              key={index}
              className="h-full"
              doc={itinerary}
              relationTo="itineraries"
              showCategories
            />
          )
        }
      })}
    </div>
  )
}
