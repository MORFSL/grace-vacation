import { General } from '@/payload-types'

interface Props {
  itinerary: General['itinerary']
}

export const TourCoordinator = ({ itinerary }: Props) => {
  if (!itinerary?.coordinator?.name || !itinerary?.coordinator?.description) {
    return null
  }

  return (
    <div
      className="my-6 bg-muted border border-primary/10 rounded-xl p-4 text-center"
      style={{
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, .05)',
      }}
    >
      <h2 className="text-2xl font-semibold">{itinerary.coordinator?.name}</h2>
      <p className="mt-2 text-sm">{itinerary.coordinator?.description}</p>
      <a
        href={`tel:${itinerary.coordinator?.phone}`}
        className="mt-2 inline-block text-xl font-medium text-primary"
      >
        {itinerary.coordinator?.phone}
      </a>
    </div>
  )
}
