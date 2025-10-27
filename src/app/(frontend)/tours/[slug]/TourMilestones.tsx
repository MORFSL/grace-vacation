import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { Itinerary } from '@/payload-types'

interface Props {
  itinerary: Itinerary
}

export const TourMilestones = ({ itinerary }: Props) => {
  if (!itinerary.milestones || itinerary.milestones.length === 0) {
    return null
  }

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold mb-6">Trip Milestones</h2>
      <div className="space-y-8">
        {itinerary.milestones.map((milestone, index) => (
          <div
            key={milestone.id || index}
            className="border-b border-gray-200 pb-8 last:border-b-0"
          >
            <h3 className="text-2xl font-semibold mb-4">{milestone.title}</h3>

            {milestone.content && (
              <div className="mb-4">
                <RichText data={milestone.content} enableGutter={false} />
              </div>
            )}

            {milestone.media && milestone.media.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {milestone.media.map((mediaItem) =>
                  typeof mediaItem === 'object' ? (
                    <Media
                      key={mediaItem.id}
                      resource={mediaItem}
                      className="overflow-hidden rounded-md"
                      imgClassName="w-full h-auto"
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
