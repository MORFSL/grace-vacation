import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { type, enableLink, link, richText, size, media } = col

            return (
              <div
                className={cn(
                  `overflow-hidden rounded-xl relative h-full flex flex-col justify-center items-center md:items-start col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  {
                    'md:col-span-2': size !== 'full',
                    'order-1 md:order-none': type === 'media',
                    'order-2 md:order-none': type === 'richText',
                    'py-8': columns.length > 1,
                  },
                )}
                key={index}
              >
                {type === 'richText' ? (
                  <>
                    {richText && <RichText data={richText} enableGutter={false} />}
                    {enableLink && <CMSLink className="mt-6 w-fit" {...link} />}
                  </>
                ) : (
                  media && (
                    <Media
                      resource={media}
                      className="h-full min-h-[20rem]"
                      imgClassName="absolute inset-0 w-full h-full object-cover"
                      videoClassName="absolute inset-0 w-full h-full object-cover"
                    />
                  )
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
