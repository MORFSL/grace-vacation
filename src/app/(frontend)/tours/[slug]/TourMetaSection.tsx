import { Itinerary } from '@/payload-types'
import { MapPin } from 'lucide-react'
import { ShareButton } from './ShareButton'

interface Props {
  itinerary: Itinerary
}

export const TourMetaSection = (props: Props) => {
  return (
    <section className="my-8">
      <div className="container">
        <h1 className="text-3xl font-bold">{props.itinerary.title}</h1>
        <div className="flex items-center justify-between gap-2">
          {props.itinerary.destination && (
            <div className="mt-2 flex items-center justify-between gap-2 text-sm font-medium">
              {typeof props.itinerary.destination === 'object' && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} /> {props.itinerary.destination.title}
                </div>
              )}
            </div>
          )}
          <ShareButton />
        </div>
      </div>
    </section>
  )
}
