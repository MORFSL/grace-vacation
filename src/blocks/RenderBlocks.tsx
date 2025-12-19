import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ItinerariesBlock } from '@/blocks/ItinerariesBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { FAQBlock } from './Faq/Component'
import { GalleryBlock } from './Gallery/Component'
import { FeaturesBlock } from './Features/Component'
import { HighlightsCarouselBlock } from './HighlightsCarousel/Component'
import { TestimonialsBlock } from './Testimonials/Component'
import { CardsBlock } from './Cards/Component'
import { cn } from '@/utilities/ui'
import { ContactBlock } from './Contact/Component'

const blockComponents = {
  itinerariesBlock: ItinerariesBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  faq: FAQBlock,
  gallery: GalleryBlock,
  features: FeaturesBlock,
  highlightsCarousel: HighlightsCarouselBlock,
  testimonials: TestimonialsBlock,
  cards: CardsBlock,
  contact: ContactBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType, blockName } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <section
                  className={cn('my-32', {
                    'mt-16': index === 0,
                    'mb-20': index === blocks.length - 1,
                  })}
                  key={index}
                  id={blockName?.replaceAll(' ', '-').toLowerCase() || ''}
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </section>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
