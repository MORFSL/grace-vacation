import React, { Fragment } from 'react'

import type { Itinerary } from '@/payload-types'

import { FAQBlock } from '@/blocks/Faq/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'

const blockComponents = {
  faq: FAQBlock,
  testimonials: TestimonialsBlock,
}

export const TourBlocks: React.FC<{
  blocks: Itinerary['otherBlocks']
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
                  className="my-24"
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
