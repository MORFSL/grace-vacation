'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar as CalendarIcon, Flag } from 'lucide-react'
import type { DateRange } from 'react-day-picker'

import type { Destination, ItineraryCategory, Page } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utilities/ui'

interface TripPlanningWidgetProps {
  destinations: Destination[]
  categories: ItineraryCategory[]
  redirect?: string
}

export const TripPlanningWidget: React.FC<TripPlanningWidgetProps> = ({
  destinations,
  categories,
  redirect,
}) => {
  const router = useRouter()
  const [selectedDestination, setSelectedDestination] = useState<string>('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const handlePlanTrip = () => {
    const params = new URLSearchParams()

    if (selectedDestination) {
      params.set('destination', selectedDestination)
    }

    if (dateRange?.from) {
      params.set('dateFrom', format(dateRange.from, 'yyyy-MM-dd'))
    }

    if (dateRange?.to) {
      params.set('dateTo', format(dateRange.to, 'yyyy-MM-dd'))
    }

    if (selectedCategory && selectedCategory !== 'all') {
      params.set('tourType', selectedCategory)
    }

    const queryString = params.toString()
    const url = `${redirect ?? ''}${queryString ? `?${queryString}` : ''}`

    router.push(url)
  }

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
      {/* Where Field */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <MapPin className="h-5 w-5 text-black stroke-2" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="text-sm font-bold text-black leading-tight">Where</div>
          <Select value={selectedDestination} onValueChange={setSelectedDestination}>
            <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0 bg-transparent hover:text-black focus:text-black">
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
          <div className="text-xs text-gray-400 leading-tight mt-0.5">Pick destination</div>
        </div>
      </div>

      {/* When Field */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <CalendarIcon className="h-5 w-5 text-black stroke-2" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="text-sm font-bold text-black leading-tight">When</div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'w-full justify-start text-left font-normal border-0 p-0 bg-transparent text-sm',
                  !dateRange && 'text-gray-400 hover:text-black',
                  dateRange && 'text-black',
                )}
              >
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(dateRange.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Select dates</span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from || new Date()}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <div className="text-xs text-gray-400 leading-tight mt-0.5">Select dates</div>
        </div>
      </div>

      {/* Tour Type Field */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <Flag className="h-5 w-5 text-black stroke-2" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="text-sm font-bold text-black leading-tight">Tour Type</div>
          <Select value={selectedCategory || 'all'} onValueChange={setSelectedCategory}>
            <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0 bg-transparent hover:text-black focus:text-black">
              <SelectValue placeholder="All tours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All tours</SelectItem>
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

      {/* Plan My Trip Button */}
      <Button
        onClick={handlePlanTrip}
        className="bg-[#AD252F] hover:bg-[#8a1d25] text-white font-bold px-6 py-6 rounded-lg whitespace-nowrap h-auto"
      >
        Plan My Trip
      </Button>
    </div>
  )
}
