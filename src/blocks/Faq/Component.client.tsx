'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import RichText from '@/components/RichText'
import type { FAQBlock } from '@/payload-types'

type FAQClientProps = {
  questions: FAQBlock['questions']
}

export default function FAQClient({ questions }: FAQClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {questions?.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleQuestion(index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-muted transition-colors"
          >
            <div className="text-base font-medium pr-8">
              <RichText
                data={item.question}
                enableGutter={false}
                enableProse={false}
                className="text-start"
              />
            </div>
            <span className="rounded-full bg-muted p-2 flex-shrink-0 flex items-center justify-center">
              {openIndex === index ? (
                <Minus size={18} className="text-red-500" />
              ) : (
                <Plus size={18} className="text-red-500" />
              )}
            </span>
          </button>

          {openIndex === index && (
            <div className="px-6 py-6">
              <RichText
                data={item.answer}
                enableGutter={false}
                className="text-gray-600 text-start"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
