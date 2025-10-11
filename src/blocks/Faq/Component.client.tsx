'use client'
import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import RichText from '@/components/RichText'
import type { FAQBlock } from '@/payload-types'

type FAQClientProps = {
  questions: FAQBlock['questions']
  title: FAQBlock['title']
}

export default function FAQClient({ questions, title }: FAQClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {title && <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>}

      <div className="space-y-4">
        {questions?.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="text-base md:text-lg font-medium pr-8">
                <RichText data={item.question} enableGutter={false} enableProse={false} />
              </div>
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-red-500 flex-shrink-0" />
              ) : (
                <Plus className="w-5 h-5 text-red-500 flex-shrink-0" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-6 pb-6">
                <RichText
                  data={item.answer}
                  enableGutter={false}
                  className="text-gray-600 prose-sm"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
