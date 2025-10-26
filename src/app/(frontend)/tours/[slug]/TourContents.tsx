import RichText from '@/components/RichText'
import { Itinerary } from '@/payload-types'

interface Props {
  itinerary: Itinerary
}
export const TourContents = (props: Props) => {
  return (
    <div>
      {props.itinerary.contents?.map(
        (content) =>
          content.richText && (
            <div key={content.id}>
              <RichText data={content.richText} enableGutter={false} />
            </div>
          ),
      )}
    </div>
  )
}
