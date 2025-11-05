import { Media } from '@/components/Media'
import { Itinerary } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface Props {
  itinerary: Itinerary
}

export const TourGallerySection = (props: Props) => {
  const mediaItemClassName = 'absolute inset-0 w-full h-full object-cover'
  const mediaItemWrapperClassName = 'relative'

  return (
    <section className="my-8">
      <div className="container">
        <div
          className={cn('md:min-h-[640px] grid grid-cols-1 gap-4', {
            'md:grid-cols-12': props.itinerary.gallery?.length,
            'md:grid-cols-1': !props.itinerary.gallery?.length,
            'md:min-h-[250px]': !props.itinerary.gallery?.length,
            'grid-rows-2': props.itinerary.gallery?.length,
          })}
        >
          {typeof props.itinerary.image === 'object' && (
            <Media
              key={props.itinerary.image.id}
              resource={props.itinerary.image}
              className={cn(
                mediaItemWrapperClassName,
                'overflow-hidden rounded-md md:row-span-2 md:col-span-6 pt-[80%]',
                {
                  'md:pt-[100%]': props.itinerary.gallery?.length,
                  'md:pt-[35%]': !props.itinerary.gallery?.length,
                },
              )}
              videoClassName={mediaItemClassName}
              imgClassName={mediaItemClassName}
            />
          )}
          {props.itinerary.gallery && (
            <>
              {typeof props.itinerary.gallery[0] === 'object' && (
                <Media
                  key={props.itinerary.gallery[0].id}
                  resource={props.itinerary.gallery[0]}
                  className={cn(
                    mediaItemWrapperClassName,
                    'overflow-hidden rounded-md md:col-span-6 pt-[25%]',
                  )}
                  videoClassName={mediaItemClassName}
                  imgClassName={mediaItemClassName}
                />
              )}
              {typeof props.itinerary.gallery[1] === 'object' && (
                <Media
                  key={props.itinerary.gallery[1].id}
                  resource={props.itinerary.gallery[1]}
                  className={cn(
                    mediaItemWrapperClassName,
                    'overflow-hidden rounded-md md:col-span-3 pt-[50%]',
                  )}
                  videoClassName={mediaItemClassName}
                  imgClassName={mediaItemClassName}
                />
              )}
              {typeof props.itinerary.gallery[2] === 'object' && (
                <Media
                  key={props.itinerary.gallery[2].id}
                  resource={props.itinerary.gallery[2]}
                  className={cn(
                    mediaItemWrapperClassName,
                    'overflow-hidden rounded-md md:col-span-3 pt-[50%]',
                  )}
                  videoClassName={mediaItemClassName}
                  imgClassName={mediaItemClassName}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
