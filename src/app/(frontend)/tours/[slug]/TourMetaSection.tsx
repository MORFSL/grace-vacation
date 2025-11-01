import { Itinerary } from '@/payload-types'
import { MapPin, Tags } from 'lucide-react'
import { ShareButton } from './ShareButton'

interface Props {
  itinerary: Itinerary
}

export const TourMetaSection = (props: Props) => {
  return (
    <section className="my-8">
      <div className="container">
        <h1 className="text-3xl font-bold">{props.itinerary.title}</h1>
        <div className="mt-4 md:mt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          {props.itinerary.destination && (
            <div className="mt-2 flex items-center justify-between gap-6 text-sm font-medium">
              {typeof props.itinerary.destination === 'object' && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} /> {props.itinerary.destination.title}
                </div>
              )}
              {props.itinerary.categories && props.itinerary.categories.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tags size={18} />
                  {props.itinerary.categories?.map(
                    (category) =>
                      typeof category === 'object' && (
                        <div
                          className="flex items-center gap-1 border-r border-slate-300 pr-2 last:border-none"
                          key={category.id}
                        >
                          {category.title}
                        </div>
                      ),
                  )}
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
