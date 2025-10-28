import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { Itinerary } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface Props {
  itinerary: Itinerary
}

export const TourMilestones = ({ itinerary }: Props) => {
  if (!itinerary.milestones || itinerary.milestones.length === 0) {
    return null
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-6">Trip Milestones</h2>
      <div className="space-y-8">
        {itinerary.milestones.map((milestone, index) => (
          <div key={milestone.id || index} className="py-4">
            <h3 className="font-semibold mb-4">{milestone.title}</h3>

            {milestone.content && (
              <div className="mb-4">
                <RichText data={milestone.content} enableGutter={false} />
              </div>
            )}

            {milestone.media && milestone.media.length > 0 && (
              <div
                className={cn(
                  'grid grid-cols-1 gap-4 mt-4',
                  milestone.media.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2',
                )}
              >
                {milestone.media.map((mediaItem) =>
                  typeof mediaItem === 'object' ? (
                    <Media
                      key={mediaItem.id}
                      resource={mediaItem}
                      className="overflow-hidden rounded-md relative pt-[340px]"
                      imgClassName="absolute inset-0 w-full h-full object-cover"
                      videoClassName="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : null,
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
