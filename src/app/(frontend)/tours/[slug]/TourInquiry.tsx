import { Button } from '@/components/ui/button'
import { General, Itinerary } from '@/payload-types'

interface Props {
  itinerary: Itinerary
  general: General
}

export const TourInquiry = ({ itinerary, general }: Props) => {
  return (
    <div
      className="my-6 bg-muted border border-primary/10 rounded-xl p-4 text-center"
      style={{
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, .05)',
      }}
    >
      <h2 className="text-lg font-bold">{general?.itinerary?.pricePrefix}</h2>
      <span className="text-2xl font-bold">
        <span className="font-semibold">
          {general?.payments?.currencyLabel} {itinerary.price}
        </span>
        {itinerary.priceType && (
          <span className="text-slate-500 font-medium">/{itinerary.priceType}</span>
        )}
      </span>
      <p className="text-sm text-muted-foreground">{itinerary.duration}</p>
      <Button className="mt-4 w-full">Make Inquiry</Button>
    </div>
  )
}
