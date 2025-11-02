'use client'

import type { Control } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { Controller } from 'react-hook-form'
import { ItineraryCategory } from '@/payload-types'

type ItineraryCategorySelectProps = {
  name: string
  control: Control
  itineraryCategories: ItineraryCategory[]
  required?: boolean
  defaultValue?: string
}

export const ItineraryCategorySelectClient: React.FC<ItineraryCategorySelectProps> = ({
  name,
  control,
  itineraryCategories,
  required,
  defaultValue,
}) => {
  const itineraryCategoryOptions = itineraryCategories.map((category) => ({
    label: category.title,
    value: category.title,
  }))

  return (
    <Controller
      control={control}
      rules={{ required }}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        return (
          <Select onValueChange={(val) => onChange(val)} value={value || undefined}>
            <SelectTrigger className="w-full border-[#AD252F1A] bg-[#FEEFE854] mt-2" id={name}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {itineraryCategoryOptions.map(({ label, value }) => {
                return (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        )
      }}
    />
  )
}
