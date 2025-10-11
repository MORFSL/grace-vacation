import { FAQBlock as FAQBlockType } from '@/payload-types'
import React from 'react'
import FAQClient from './Component.client'

export const FAQBlock: React.FC<FAQBlockType> = ({ blockType, questions, title, blockName }) => {
  return <FAQClient questions={questions} title={title} />
}
