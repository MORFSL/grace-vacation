import { General } from '@/payload-types'

interface Props {
  itinerary: General['itinerary']
}

export const TourCoordinator = ({ itinerary }: Props) => {
  if (!itinerary?.coordinator?.name || !itinerary?.coordinator?.description) {
    return null
  }

  return (
    <div className="my-6 bg-muted rounded-xl p-4 text-center">
      <h2 className="text-lg font-bold">{itinerary.coordinator?.name}</h2>
      <p className="text-sm text-muted-foreground">{itinerary.coordinator?.description}</p>
      <a href={`tel:${itinerary.coordinator?.phone}`} className="text-sm text-muted-foreground">
        {itinerary.coordinator?.phone}
      </a>
    </div>
  )
}
