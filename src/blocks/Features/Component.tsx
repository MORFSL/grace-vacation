import React from 'react'

import type { FeaturesBlock as FeatureBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const FeaturesBlock: React.FC<FeatureBlockProps> = ({ title, features }) => {
  return (
    <div className="px-8 md:px-20 xl:px-28 mx-auto container">
      {title && (
        <RichText className="mb-12 md:max-w-xl" data={title} enableGutter={false} center={true} />
      )}
      {features && (
        <div className="flex justify-center gap-4 xl:gap-16">
          {features.map((feature) => (
            <div
              className="flex-1 max-w-[24rem] p-10 rounded-xl border border-primary/30 flex flex-col items-center justify-center bg-muted"
              key={feature.id}
            >
              {feature.image && typeof feature.image === 'object' && (
                <Media resource={feature.image} className="mb-5 w-12 object-contain" />
              )}
              {feature.title && (
                <RichText
                  className="[&>p:first-child]:mb-0 [&>p:last-child]:mt-2"
                  data={feature.title}
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
