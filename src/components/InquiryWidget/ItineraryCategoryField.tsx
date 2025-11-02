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
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
        <Flag className="h-5 w-5 text-black stroke-2" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="text-sm font-bold text-black leading-tight">Tour Type</div>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0 bg-transparent hover:text-black focus:text-black [&>svg]:hidden">
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
        <div className="text-xs text-gray-400 leading-tight mt-0.5">All tours</div>
      </div>
    </div>
  )
}
