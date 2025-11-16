'use client'

import { Media } from '@/components/Media'
import { Itinerary, Media as MediaType } from '@/payload-types'
import { TourGalleryLightbox } from './TourGalleryLightbox'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

interface Props {
  itinerary: Itinerary
}

export const TourGallerySlider = (props: Props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const slides: MediaType[] = []

  if (props.itinerary.image && typeof props.itinerary.image === 'object') {
    slides.push(props.itinerary.image)
  }

  if (props.itinerary.gallery && props.itinerary.gallery.length) {
    props.itinerary.gallery.forEach((item) => {
      if (typeof item === 'object') {
        slides.push(item)
      }
    })
  }

  if (!slides.length) return null

  const handleSlideClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <section className="my-8 md:hidden">
        <div className="container">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={slides.length > 1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              el: '.tour-gallery-pagination',
              clickable: true,
              renderBullet: (index, className) =>
                `<span class="${className} !bg-primary w-2.5 h-2.5 rounded-full inline-block mx-1"></span>`,
            }}
            className="overflow-hidden rounded-xl"
          >
            {slides.map((media, index) => (
              <SwiperSlide key={typeof media === 'object' && 'id' in media ? media.id : index}>
                <button
                  type="button"
                  className="relative block w-full h-full cursor-pointer focus:outline-none"
                  onClick={() => handleSlideClick(index)}
                >
                  <div className="relative w-full pt-[65%] md:pt-[45%] lg:pt-[40%]">
                    <Media
                      resource={media}
                      className="absolute inset-0"
                      imgClassName="absolute inset-0 w-full h-full object-cover"
                      videoClassName="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="tour-gallery-pagination mt-4 flex justify-center" />
        </div>
      </section>

      <TourGalleryLightbox
        media={slides}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        initialIndex={lightboxIndex}
      />
    </>
  )
}
