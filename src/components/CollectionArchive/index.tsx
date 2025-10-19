import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardItineraryData } from '@/components/Card'

export type Props = {
  itineraries: CardItineraryData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { itineraries } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {itineraries?.map((itinerary, index) => {
            if (typeof itinerary === 'object' && itinerary !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card
                    className="h-full"
                    doc={itinerary}
                    relationTo="itineraries"
                    showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
