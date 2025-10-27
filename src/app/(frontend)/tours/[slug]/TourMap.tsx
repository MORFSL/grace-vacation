import { Itinerary } from '@/payload-types'

interface Props {
  itinerary: Itinerary
}

export const TourMap = ({ itinerary }: Props) => {
  if (!itinerary.mapEmbed) {
    return null
  }

  return (
    <div
      className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm"
      dangerouslySetInnerHTML={{ __html: itinerary.mapEmbed }}
    />
  )
}
