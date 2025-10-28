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
      className="w-full h-[300px] md:h-[500px] overflow-hidden border border-primary/10 rounded-xl [&>iframe]:w-full [&>iframe]:h-[calc(100%+150px)] [&>iframe]:border-0 [&>iframe]:mt-[-150px]"
      style={{
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, .05)',
      }}
      dangerouslySetInnerHTML={{ __html: itinerary.mapEmbed }}
    />
  )
}
