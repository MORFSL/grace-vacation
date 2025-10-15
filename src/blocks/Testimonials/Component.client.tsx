'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

interface Props {
  testimonials: TestimonialsBlockProps['testimonials']
}

export const TestimonialsClient: React.FC<Props> = ({ testimonials }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} !bg-primary w-3 h-3 rounded-full inline-block mx-1"></span>`,
        }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {testimonials.map((testimonial) => {
          if (typeof testimonial === 'object' && testimonial) {
            return (
              <SwiperSlide key={testimonial.id}>
                <div className="min-h-[250px] md:min-h-[200px] px-8 text-center cursor-grab">
                  <blockquote className="text-lg mb-4">
                    &quot;{testimonial.message}&quot;
                  </blockquote>
                  <cite className="block text-sm not-italic font-semibold text-primary">
                    {testimonial.name}
                  </cite>
                </div>
              </SwiperSlide>
            )
          }
          return null
        })}
      </Swiper>
    </div>
  )
}
