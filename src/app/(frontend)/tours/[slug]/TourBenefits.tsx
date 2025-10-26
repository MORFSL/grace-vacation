import { Itinerary } from '@/payload-types'

interface Props {
  itinerary: Itinerary
}

export const TourBenefits = ({ itinerary }: Props) => {
  if (!itinerary?.benefits?.title || !itinerary?.benefits?.items) {
    return null
  }

  return (
    <div className="my-6 p-4 bg-muted rounded-xl">
      {itinerary.benefits.title && (
        <h2 className="text-lg font-bold">{itinerary.benefits.title}</h2>
      )}
      {itinerary.benefits.items && (
        <ul className="list-disc list-inside">
          {itinerary.benefits.items.map((item) => (
            <li key={item.id}>{item.benefit}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
