'use client'

import React from 'react'
import { Flag } from 'lucide-react'
import type { ItineraryCategory } from '@/payload-types'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ItineraryCategoryFieldProps {
  value: string
  onChange: (value: string) => void
  categories: ItineraryCategory[]
}

export const ItineraryCategoryField: React.FC<ItineraryCategoryFieldProps> = ({
  value,
  onChange,
  categories,
}) => {
  return (
    <div className="min-w-[170px] flex items-center gap-3">
      <div className="border-2 border-slate-200 flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center">
        <Flag className="h-4 w-4 lg:h-5 lg:w-5 text-black stroke-2" />
      </div>
      <div className="py-1 flex-1 min-w-0 flex flex-col">
        <div className="text-sm font-semibold text-black leading-tight">Tour Type</div>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="border-0 p-0 h-auto shadow-none font-medium focus:ring-0 bg-transparent text-slate-500 hover:text-black [&>svg]:hidden">
            <SelectValue placeholder="All tours" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.title}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
