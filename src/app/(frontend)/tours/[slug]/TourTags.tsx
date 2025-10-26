import { Itinerary } from '@/payload-types'

interface Props {
  itinerary: Itinerary
}

export const TourTags = ({ itinerary }: Props) => {
  if (!itinerary.tags?.length) {
    return null
  }

  return (
    <div className="my-2 flex flex-wrap gap-2">
      {itinerary.tags?.map(
        (tag) =>
          typeof tag === 'object' && (
            <div key={tag.id} className="text-sm border border-primary/10 rounded-md px-2 py-1">
              {tag.title}
            </div>
          ),
      )}
    </div>
  )
}
