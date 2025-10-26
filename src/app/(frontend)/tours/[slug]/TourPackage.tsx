import { Itinerary } from '@/payload-types'

interface Props {
  itinerary: Itinerary
}

export const TourPackage = (props: Props) => {
  return (
    <>
      {props.itinerary.inclusions && (
        <>
          {props.itinerary.inclusions.title && (
            <h4 className="text-lg font-bold">{props.itinerary.inclusions.title}</h4>
          )}
          <ul className="list-disc list-inside">
            {props.itinerary.inclusions.items?.map(({ inclusion }, index) => (
              <li key={index}>{inclusion}</li>
            ))}
          </ul>
        </>
      )}
      {props.itinerary.exclusions && (
        <>
          {props.itinerary.exclusions.title && (
            <h4 className="text-lg font-bold">{props.itinerary.exclusions.title}</h4>
          )}
          <ul className="list-disc list-inside">
            {props.itinerary.exclusions.items?.map(({ exclusion }, index) => (
              <li key={index}>{exclusion}</li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
