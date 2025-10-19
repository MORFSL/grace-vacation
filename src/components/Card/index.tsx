'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Itinerary } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardItineraryData = Pick<Itinerary, 'slug' | 'meta' | 'title' | 'image'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardItineraryData
  relationTo?: 'itineraries'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, title: titleFromProps } = props

  const { slug, meta, title, image } = doc || {}
  const { description } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/tours/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        {image && typeof image !== 'string' && <Media resource={image} size="33vw" />}
      </div>
      {titleToUse && (
        <div className="prose">
          <h3>
            <Link className="not-prose" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        </div>
      )}
      {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
    </article>
  )
}
