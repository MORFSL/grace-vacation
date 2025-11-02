'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import type { DateRange } from 'react-day-picker'

import type { Destination, ItineraryCategory } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { DestinationField } from './DestinationField'
import { DateField } from './DateField'
import { ItineraryCategoryField } from './ItineraryCategoryField'

interface InquiryWidgetProps {
  destinations: Destination[]
  categories: ItineraryCategory[]
  redirect?: string
}

export const InquiryWidget: React.FC<InquiryWidgetProps> = ({
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
      params.set('arrival', format(dateRange.from, 'yyyy-MM-dd'))
    }

    if (dateRange?.to) {
      params.set('departure', format(dateRange.to, 'yyyy-MM-dd'))
    }

    if (selectedCategory) {
      params.set('type', selectedCategory)
    }

    const queryString = params.toString()
    const url = `${redirect ?? ''}${queryString ? `?${queryString}` : ''}`

    router.push(url)
  }

  return (
    <div className="bg-white rounded-xl py-4 px-6 flex flex-col lg:flex-row gap-4 lg:gap-10 items-stretch lg:items-center">
      <DestinationField
        value={selectedDestination}
        onChange={setSelectedDestination}
        destinations={destinations}
      />
      <DateField value={dateRange} onChange={setDateRange} />
      <ItineraryCategoryField
        value={selectedCategory}
        onChange={setSelectedCategory}
        categories={categories}
      />
      <Button
        onClick={handlePlanTrip}
        className="bg-[#AD252F] hover:bg-[#8a1d25] text-white font-medium text-md px-6 py-2 lg:py-4 rounded-lg whitespace-nowrap h-auto"
      >
        Plan My Trip
      </Button>
    </div>
  )
}
