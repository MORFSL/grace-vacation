import { Itinerary } from '@/payload-types'

interface Props {
  itinerary: Itinerary
}

export const TourPackage = (props: Props) => {
  return (
    <>
      {props.itinerary.inclusions && (
        <div className="my-8">
          <div className="prose md:prose-md dark:prose-invert">
            {props.itinerary.inclusions.title && (
              <h4 className="text-lg font-bold">{props.itinerary.inclusions.title}</h4>
            )}
            <ul>
              {props.itinerary.inclusions.items?.map(({ inclusion }, index) => (
                <li key={index}>{inclusion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {props.itinerary.exclusions && (
        <div className="my-8">
          <div className="prose md:prose-md dark:prose-invert">
            {props.itinerary.exclusions.title && (
              <h4 className="text-lg font-bold">{props.itinerary.exclusions.title}</h4>
            )}
            <ul>
              {props.itinerary.exclusions.items?.map(({ exclusion }, index) => (
                <li key={index}>{exclusion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
