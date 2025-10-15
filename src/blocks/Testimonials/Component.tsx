import React from 'react'
import type { General, TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

import { TestimonialsClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Image from 'next/image'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = async ({
  title,
  testimonials,
}) => {
  const general = (await getCachedGlobal('general', 1)()) as General

  return (
    <div className="px-8 md:px-20 xl:px-28 mx-auto container">
      {general.testimonials?.platform && (
        <div className="mb-8 mx-auto max-w-[200px] relative text-center">
          <Image
            src={'/static-media/review-element.webp'}
            alt={general.testimonials?.platform}
            width={100}
            height={100}
            className="absolute top-0 left-0 h-[85%] object-contain"
          />
          <span className="block text-[40px] text-primary font-bold">
            {general.testimonials?.rating}
          </span>
          <span className="block text-xs font-semibold uppercase">
            {general.testimonials?.platform}
          </span>
          <Image
            src={'/static-media/review-element.webp'}
            alt={general.testimonials?.platform}
            width={100}
            height={100}
            className="absolute top-0 right-0 transform -scale-x-100 h-[85%] object-contain"
          />
        </div>
      )}
      {title && (
        <RichText className="mb-12 md:max-w-xl" data={title} enableGutter={false} center={true} />
      )}
      {testimonials && <TestimonialsClient testimonials={testimonials} />}
    </div>
  )
}
