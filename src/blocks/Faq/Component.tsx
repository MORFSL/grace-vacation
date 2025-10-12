import { FAQBlock as FAQBlockType } from '@/payload-types'
import React from 'react'
import FAQClient from './Component.client'
import RichText from '@/components/RichText'

export const FAQBlock: React.FC<FAQBlockType> = ({ questions, title }) => {
  return (
    <div className="mx-auto max-w-4xl container">
      {title && <RichText className="mb-12" data={title} enableGutter={false} center={true} />}

      <FAQClient questions={questions} />
    </div>
  )
}
