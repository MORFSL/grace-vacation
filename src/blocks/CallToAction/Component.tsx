import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import Image from 'next/image'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, image }) => {
  return (
    <div className="px-8 md:px-20 xl:px-48 mx-auto container">
      <div className="bg-muted rounded-xl overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 lg:p-16">
            {richText && (
              <RichText
                className="mb-8 prose-em:text-primary prose-em:not-italic"
                data={richText}
                enableGutter={false}
              />
            )}
            <div className="flex flex-col items-center md:items-start gap-4">
              {(links || []).map(({ link }, i) => {
                return <CMSLink key={i} {...link} />
              })}
            </div>
          </div>
          {image && typeof image !== 'string' && (
            <div className="relative pt-[50%] overflow-hidden">
              <Image
                src="/static-media/vertical-wave-overlay.webp"
                alt="Overlay"
                width={100}
                height={100}
                className="absolute top-0 left-0 w-full h-[200%] lg:h-full z-10 object-contain object-left rotate-90 lg:rotate-0"
              />
              <Media resource={image} imgClassName="absolute inset-0 w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
