import { Itinerary } from '@/payload-types'

interface Props {
  itinerary: Itinerary
}

export const TourBenefits = ({ itinerary }: Props) => {
  if (!itinerary?.benefits?.title || !itinerary?.benefits?.items) {
    return null
  }

  return (
    <div
      className="my-6 bg-muted border border-primary/10 rounded-xl p-4"
      style={{
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, .05)',
      }}
    >
      {itinerary.benefits.title && <h2 className="font-semibold">{itinerary.benefits.title}</h2>}
      {itinerary.benefits.items && (
        <ul className="mt-2 list-disc list-inside">
          {itinerary.benefits.items.map((item) => (
            <li key={item.id}>{item.benefit}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
