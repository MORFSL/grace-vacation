import DynamicIcon from '@/components/Icon/DynamicIcon'
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
              className="flex items-center gap-2 border border-primary/30 rounded-xl px-5 py-2 text-sm text-[#5F6178] font-medium [&>svg]:text-primary"
            >
              {tag.icon && <DynamicIcon name={tag.icon} size={18} strokeWidth={1.5} />} {tag.title}
            </div>
          ),
      )}
    </div>
  )
}
