import { Itinerary } from '@/payload-types'
import { Check, X } from 'lucide-react'

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
            <ul className="mt-4 ps-1 list-none space-y-2">
              {props.itinerary.inclusions.items?.map(({ inclusion }, index) => (
                <li key={index} className="px-0 flex items-start gap-3">
                  <InclusionIcon /> <span className="inline-block">{inclusion}</span>
                </li>
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
            <ul className="mt-4 ps-1 list-none space-y-2">
              {props.itinerary.exclusions.items?.map(({ exclusion }, index) => (
                <li key={index} className="px-0 flex items-start gap-3">
                  <ExclusionIcon /> <span>{exclusion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

const InclusionIcon = () => (
  <span className="mt-1 inline-block text-green-600 bg-green-500/10 rounded-full p-1">
    <Check size={12} />
  </span>
)

const ExclusionIcon = () => (
  <span className="mt-1 inline-block text-red-600 bg-red-500/10 rounded-full p-1">
    <X size={12} />
  </span>
)
