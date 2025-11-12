'use client'

import { Media } from '@/components/Media'
import { Itinerary, Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { TourGalleryLightbox } from './TourGalleryLightbox'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'

interface Props {
  itinerary: Itinerary
}

export const TourGallerySection = (props: Props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const mediaItemClassName = 'absolute inset-0 w-full h-full object-cover'
  const mediaItemWrapperClassName = 'relative'

  const allMedia: MediaType[] = []
  if (props.itinerary.gallery) {
    props.itinerary.gallery.forEach((item) => {
      if (typeof item === 'object') {
        allMedia.push(item)
      }
    })
  }

  const handleMediaClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const showAllPhotosButton = allMedia.length > 3

  return (
    <>
      <section className="my-8">
        <div className="container">
          <div
            className={cn('md:min-h-[400px] lg:min-h-[640px] grid grid-cols-1 gap-4', {
              'md:grid-cols-12': props.itinerary.gallery?.length,
              'md:grid-cols-1': !props.itinerary.gallery?.length,
              'md:min-h-[250px]': !props.itinerary.gallery?.length,
              'grid-rows-2': props.itinerary.gallery?.length,
              hidden: !props.itinerary.image,
            })}
          >
            {props.itinerary.image && typeof props.itinerary.image === 'object' && (
              <div
                className={cn(
                  mediaItemWrapperClassName,
                  'overflow-hidden rounded-md md:row-span-2 md:col-span-6 pt-[80%]',
                  {
                    'md:pt-[100%]': props.itinerary.gallery?.length,
                    'md:pt-[35%]': !props.itinerary.gallery?.length,
                  },
                )}
              >
                <Media
                  key={props.itinerary.image.id}
                  resource={props.itinerary.image}
                  className="absolute inset-0"
                  videoClassName={mediaItemClassName}
                  imgClassName={mediaItemClassName}
                />
              </div>
            )}
            {props.itinerary.gallery && (
              <>
                {typeof props.itinerary.gallery[0] === 'object' && (
                  <div
                    className={cn(
                      mediaItemWrapperClassName,
                      'overflow-hidden rounded-md md:col-span-6 pt-[25%] cursor-pointer',
                    )}
                    onClick={() => handleMediaClick(0)}
                  >
                    <Media
                      key={props.itinerary.gallery[0].id}
                      resource={props.itinerary.gallery[0]}
                      className="absolute inset-0"
                      videoClassName={mediaItemClassName}
                      imgClassName={mediaItemClassName}
                    />
                  </div>
                )}
                {typeof props.itinerary.gallery[1] === 'object' && (
                  <div
                    className={cn(
                      mediaItemWrapperClassName,
                      'overflow-hidden rounded-md md:col-span-3 pt-[50%] cursor-pointer',
                    )}
                    onClick={() => handleMediaClick(1)}
                  >
                    <Media
                      key={props.itinerary.gallery[1].id}
                      resource={props.itinerary.gallery[1]}
                      className="absolute inset-0"
                      videoClassName={mediaItemClassName}
                      imgClassName={mediaItemClassName}
                    />
                  </div>
                )}
                {typeof props.itinerary.gallery[2] === 'object' && (
                  <div
                    className={cn(
                      mediaItemWrapperClassName,
                      'overflow-hidden rounded-md md:col-span-3 pt-[50%] cursor-pointer',
                    )}
                    onClick={() => handleMediaClick(2)}
                  >
                    <Media
                      key={props.itinerary.gallery[2].id}
                      resource={props.itinerary.gallery[2]}
                      className="absolute inset-0"
                      videoClassName={mediaItemClassName}
                      imgClassName={mediaItemClassName}
                    />
                    {showAllPhotosButton && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-5 right-5 flex items-center gap-2 z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMediaClick(3)
                        }}
                      >
                        <Camera className="h-4 w-4" />
                        <span className="md:hidden lg:block">Show All Photos</span>
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <TourGalleryLightbox
        media={allMedia}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        initialIndex={lightboxIndex}
      />
    </>
  )
}
