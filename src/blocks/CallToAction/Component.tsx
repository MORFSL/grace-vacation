import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, image }) => {
  return (
    <div className="container my-16">
      <div className="bg-card rounded border-border border overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            {richText && <RichText className="mb-8" data={richText} enableGutter={false} />}
            <div className="flex flex-col gap-4">
              {(links || []).map(({ link }, i) => {
                return <CMSLink key={i} size="lg" {...link} />
              })}
            </div>
          </div>

          {/* Right side - Image */}
          {image && typeof image !== 'string' && (
            <div className="relative h-64 md:h-auto">
              <Media resource={image} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
