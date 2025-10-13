import React, { useState } from 'react'
import type { HighlightsCarouselBlock as HighlightsCarouselBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { HighlightsCarouselClient } from './Component.client'

export const HighlightsCarouselBlock: React.FC<HighlightsCarouselBlockProps> = ({
  title,
  highlights,
}) => {
  return (
    <div className="mx-auto container">
      {title && (
        <RichText className="mb-12 md:max-w-3xl" data={title} enableGutter={false} center={true} />
      )}
      <HighlightsCarouselClient highlights={highlights} />
    </div>
  )
}
