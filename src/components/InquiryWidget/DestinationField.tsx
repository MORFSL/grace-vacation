'use client'

import React from 'react'
import { MapPin } from 'lucide-react'
import type { Destination } from '@/payload-types'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DestinationFieldProps {
  value: string
  onChange: (value: string) => void
  destinations: Destination[]
}

export const DestinationField: React.FC<DestinationFieldProps> = ({
  value,
  onChange,
  destinations,
}) => {
  return (
    <div className="min-w-[200px] flex items-center gap-3">
      <div className="border-2 border-slate-200 flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center">
        <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-black stroke-2" />
      </div>
      <div className="py-1 flex-1 min-w-0 flex flex-col">
        <div className="text-sm font-semibold text-black leading-tight">Where</div>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="border-0 p-0 h-auto shadow-none font-medium focus:ring-0 bg-transparent text-slate-500 hover:text-black [&>svg]:hidden">
            <SelectValue placeholder="Pick destination" />
          </SelectTrigger>
          <SelectContent>
            {destinations.map((destination) => (
              <SelectItem key={destination.id} value={destination.title}>
                {destination.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
