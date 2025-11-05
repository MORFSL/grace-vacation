'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import type { HighlightsCarouselBlock as HighlightsCarouselBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

interface Props {
  highlights: HighlightsCarouselBlockProps['highlights']
}

export const HighlightsCarouselClient: React.FC<Props> = ({ highlights }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleTabClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index)
    }
  }

  return (
    <div>
      {highlights && highlights.length > 0 && (
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {highlights.map((highlight, index) => (
              <button
                key={highlight.id}
                onClick={() => handleTabClick(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 leading-none ${
                  activeIndex === index
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-primary-foreground text-foreground'
                }`}
              >
                {highlight.name}
              </button>
            ))}
          </div>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            modules={[EffectFade]}
            allowTouchMove={false}
            className="overflow-hidden rounded-xl"
            autoplay={{
              delay: 1500,
              disableOnInteraction: true,
            }}
            effect={'fade'}
            loop
          >
            {highlights.map((highlight) => (
              <SwiperSlide key={highlight.id}>
                <div className="overflow-hidden relative p-16 min-h-[500px] rounded-xl flex flex-col items-center justify-end md:justify-center bg-muted min-h-[400px]">
                  {highlight.image && typeof highlight.image === 'object' && (
                    <Media
                      resource={highlight.image}
                      imgClassName="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 top-auto md:top-0 w-full md:w-[50%] h-[50%] md:h-full bg-gradient-to-b md:bg-gradient-to-l from-transparent via-transparent/80 to-[#000000de] to-[70%]" />
                  {highlight.content && (
                    <RichText
                      className="relative md:max-w-[350px] ms-0 prose-h3:text-3xl z-5 text-white"
                      data={highlight.content}
                      enableGutter={false}
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}
