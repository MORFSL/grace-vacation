import React from 'react'

import type { CardsBlock as CardsBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const CardsBlock: React.FC<CardsBlockProps> = ({ richText, cards }) => {
  return (
    <div className="mx-auto container">
      {richText && (
        <RichText
          className="mb-10 md:max-w-xl"
          data={richText}
          enableGutter={false}
          center={true}
        />
      )}
      {cards && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div className="p-3 border border-primary/10 rounded-lg bg-muted" key={card.id}>
              <div className="relative w-full pt-[100%]">
                {card.media && typeof card.media === 'object' && (
                  <Media
                    resource={card.media}
                    className="rounded-md overflow-hidden"
                    imgClassName="rounded-md overflow-hidden absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
              {card.richText && (
                <RichText
                  className="[&>p:first-child]:mb-0 [&>p:last-child]:mt-2"
                  data={card.richText}
                  enableGutter={false}
                  center={true}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
