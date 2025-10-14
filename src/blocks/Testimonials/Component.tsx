import React from 'react'
import type { General, TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

import { TestimonialsClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = async ({
  title,
  testimonials,
}) => {
  const general = (await getCachedGlobal('general', 1)()) as General

  return (
    <div className="px-8 md:px-20 xl:px-28 mx-auto container">
      {general.testimonials?.platform && (
        <div className="mb-12 text-center">
          <span className="block">{general.testimonials?.rating}</span>
          <span className="block">{general.testimonials?.platform}</span>
        </div>
      )}
      {title && (
        <RichText className="mb-12 md:max-w-xl" data={title} enableGutter={false} center={true} />
      )}
      {testimonials && <TestimonialsClient testimonials={testimonials} />}
    </div>
  )
}
