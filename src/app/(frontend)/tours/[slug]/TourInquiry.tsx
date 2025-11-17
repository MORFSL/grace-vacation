import { Button } from '@/components/ui/button'
import { General, Itinerary } from '@/payload-types'

interface Props {
  itinerary: Itinerary
  general: General
}

export const TourInquiry = ({ itinerary, general }: Props) => {
  if (!itinerary.price) {
    return null
  }

  return (
    <div
      className="my-6 bg-muted border border-primary/10 rounded-xl p-6 text-center"
      style={{
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, .05)',
      }}
    >
      <h2 className="font-medium text-muted-foreground">{general?.itinerary?.pricePrefix}</h2>
      <div className="mt-1 text-2xl font-bold">
        <span className="font-semibold">
          {general?.payments?.currencyLabel} {itinerary.price}
        </span>
        {itinerary.priceType && (
          <span className="text-muted-foreground font-medium">
            /<span className="text-lg">{itinerary.priceType}</span>
          </span>
        )}
      </div>
      <p className="mt-2 text-sm">{itinerary.duration}</p>
      <Button className="mt-6 w-full">Make An Inquiry</Button>
    </div>
  )
}
