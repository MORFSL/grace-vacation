import { ItineraryArchive } from '@/components/ItineraryArchive'
import type { Itinerary as ItineraryType } from '@/payload-types'

export type Props = {
  itineraries: ItineraryType[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { itineraries } = props

  return <ItineraryArchive itineraries={itineraries} />
}
