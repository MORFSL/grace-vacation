import { Itinerary } from '@/payload-types'
import { Check } from 'lucide-react'

interface Props {
  itinerary: Itinerary
}

export const TourBenefits = ({ itinerary }: Props) => {
  if (!itinerary?.benefits?.title || !itinerary?.benefits?.items) {
    return null
  }

  return (
    <div
      className="my-6 bg-muted border border-primary/10 rounded-xl p-6"
      style={{
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, .05)',
      }}
    >
      {itinerary.benefits.title && <h2 className="font-semibold">{itinerary.benefits.title}</h2>}
      {itinerary.benefits.items && (
        <ul className="mt-4 list-none space-y-2 text-sm">
          {itinerary.benefits.items.map((item) => (
            <li key={item.id} className="flex items-start gap-2">
              <CheckIcon /> {item.benefit}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const CheckIcon = () => (
  <span className="inline-block text-green-600 bg-green-500/10 rounded-full p-1">
    <Check size={12} />
  </span>
)
