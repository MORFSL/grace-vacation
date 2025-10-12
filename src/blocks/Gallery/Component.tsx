import React from 'react'

import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const GalleryBlock: React.FC<GalleryBlockProps> = ({ title, mediaItems }) => {
  const mediaItemClassName = 'absolute inset-0 w-full h-full object-cover'
  const mediaItemWrapperClassName = 'relative'

  return (
    <div className="mx-auto container">
      {title && (
        <RichText className="mb-12 md:max-w-2xl" data={title} enableGutter={false} center={true} />
      )}

      {mediaItems && (
        <div className="md:min-h-[640px] grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-4">
          {typeof mediaItems[0] === 'object' && (
            <Media
              key={mediaItems[0].id}
              resource={mediaItems[0]}
              className={cn(
                mediaItemWrapperClassName,
                'overflow-hidden rounded-md md:row-span-2 md:col-span-4 pt-[80%] md:pt-[100%]',
              )}
              videoClassName={mediaItemClassName}
              imgClassName={mediaItemClassName}
            />
          )}
          {typeof mediaItems[1] === 'object' && (
            <Media
              key={mediaItems[1].id}
              resource={mediaItems[1]}
              className={cn(
                mediaItemWrapperClassName,
                'overflow-hidden rounded-md md:col-span-8 pt-[25%]',
              )}
              videoClassName={mediaItemClassName}
              imgClassName={mediaItemClassName}
            />
          )}
          {typeof mediaItems[2] === 'object' && (
            <Media
              key={mediaItems[2].id}
              resource={mediaItems[2]}
              className={cn(
                mediaItemWrapperClassName,
                'overflow-hidden rounded-md md:col-span-3 pt-[50%]',
              )}
              videoClassName={mediaItemClassName}
              imgClassName={mediaItemClassName}
            />
          )}
          {typeof mediaItems[3] === 'object' && (
            <Media
              key={mediaItems[3].id}
              resource={mediaItems[3]}
              className={cn(
                mediaItemWrapperClassName,
                'overflow-hidden rounded-md md:col-span-5 pt-[50%]',
              )}
              videoClassName={mediaItemClassName}
              imgClassName={mediaItemClassName}
            />
          )}
        </div>
      )}
    </div>
  )
}
