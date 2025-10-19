import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type {
  Destination as DestinationType,
  General as GeneralType,
  Itinerary as ItineraryType,
} from '@/payload-types'

import { Media } from '@/components/Media'
import { MapPin } from 'lucide-react'
import { getCachedGlobal } from '@/utilities/getGlobals'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: ItineraryType
  relationTo?: 'itineraries'
  showCategories?: boolean
  title?: string
  destination?: DestinationType
}> = async (props) => {
  const general = (await getCachedGlobal('general')()) as GeneralType

  const { className, doc, title: titleFromProps } = props
  const { slug, title, image, duration, destination, price, priceType } = doc || {}

  const titleToUse = titleFromProps || title
  const href = `/tours/${slug}`

  return (
    <article
      className={cn(
        'p-3 border border-primary/10 rounded-lg bg-muted hover:cursor-pointer',
        className,
      )}
    >
      <Link href={href}>
        <div className="relative w-full pt-[80%]">
          {image && typeof image !== 'string' && (
            <Media
              resource={image}
              className="rounded-md overflow-hidden"
              imgClassName="rounded-md overflow-hidden absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
        {(destination || duration) && (
          <div className="mt-2 flex items-center justify-between gap-2 text-[13px] font-medium">
            {destination && typeof destination === 'object' && (
              <div className="flex items-center gap-1">
                <MapPin size={14} /> {destination.title}
              </div>
            )}
            {duration && <div>{duration}</div>}
          </div>
        )}
        {titleToUse && (
          <div className="prose mt-2">
            <h3 className="text-lg font-medium">{titleToUse}</h3>
          </div>
        )}
        {price && (
          <div className="mt-2">
            <span className="font-semibold">
              {general?.payments?.currencyLabel} {price}
            </span>
            {priceType && <span className="text-slate-500 font-medium">/{priceType}</span>}
          </div>
        )}
      </Link>
    </article>
  )
}
