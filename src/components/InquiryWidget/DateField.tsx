'use client'

import React from 'react'
import { CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DateFieldProps {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
}

export const DateField: React.FC<DateFieldProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
        <CalendarIcon className="h-5 w-5 text-black stroke-2" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="text-sm font-bold text-black leading-tight">When</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between font-normal px-0 py-0 text-md h-fit"
            >
              {value?.from && value?.to
                ? `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`
                : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar mode="range" selected={value} onSelect={onChange} />
          </PopoverContent>
        </Popover>
        <div className="text-xs text-gray-400 leading-tight mt-0.5">Select dates</div>
      </div>
    </div>
  )
}
