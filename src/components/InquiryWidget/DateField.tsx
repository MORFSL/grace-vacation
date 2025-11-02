'use client'

import React from 'react'
import { CalendarCheck } from 'lucide-react'
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
    <div className="min-w-[200px] border-y border-primary/10 lg:border-y-0 max-lg:py-4 flex items-center gap-3">
      <div className="border-2 border-slate-200 flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center">
        <CalendarCheck className="h-4 w-4 lg:h-5 lg:w-5 text-black stroke-2" />
      </div>
      <div className="py-1 flex-1 flex flex-col">
        <div className="text-sm font-semibold text-black leading-tight">When</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between font-medium px-0 py-0 text-md text-slate-500 hover:text-black h-fit"
            >
              {value?.from && value?.to
                ? `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`
                : 'Select dates'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar mode="range" selected={value} onSelect={onChange} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
