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
          el: '#testimonialPagination',
          clickable: true,
        }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {testimonials.map((testimonial) => {
          if (typeof testimonial === 'object' && testimonial) {
            return (
              <SwiperSlide key={testimonial.id}>
                <div className="min-h-[200px] p-8 text-center cursor-grab">
                  <blockquote className="text-lg mb-4 italic">
                    &quot;{testimonial.message}&quot;
                  </blockquote>
                  <cite className="text-sm font-semibold text-primary">— {testimonial.name}</cite>
                </div>
              </SwiperSlide>
            )
          }
          return null
        })}
        <div
          id="testimonialPagination"
          className="mt-2 flex justify-center items-center gap-2 text-primary"
        ></div>
      </Swiper>
    </div>
  )
}
