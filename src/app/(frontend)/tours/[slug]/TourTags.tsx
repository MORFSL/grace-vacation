import { Media } from '@/components/Media'
import { Itinerary } from '@/payload-types'

interface Props {
  itinerary: Itinerary
}

export const TourTags = ({ itinerary }: Props) => {
  if (!itinerary.tags?.length) {
    return null
  }

  return (
    <div className="my-2 flex flex-wrap gap-4">
      {itinerary.tags?.map(
        (tag) =>
          typeof tag === 'object' && (
            <div
              key={tag.id}
              className="flex items-center gap-2 border border-primary/30 rounded-xl px-5 pt-2 pb-3 text-sm text-[#5F6178] font-medium"
            >
              {tag.image && (
                <Media
                  resource={tag.image}
                  className="w-4 h-4"
                  imgClassName="w-5 h-5 object-contain"
                />
              )}
              {tag.title}
            </div>
          ),
      )}
    </div>
  )
}
