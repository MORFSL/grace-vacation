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
import { Destination } from '@/payload-types'

type DestinationSelectProps = {
  name: string
  control: Control
  destinations: Destination[]
  required?: boolean
  defaultValue?: string
}

export const DestinationSelectClient: React.FC<DestinationSelectProps> = ({
  name,
  control,
  destinations,
  required,
  defaultValue,
}) => {
  const destinationOptions = destinations.map((destination) => ({
    label: destination.title,
    value: destination.title,
  }))

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{ required }}
      render={({ field: { onChange, value } }) => {
        return (
          <Select onValueChange={(val) => onChange(val)} value={value || undefined}>
            <SelectTrigger className="w-full border-[#AD252F1A] bg-[#FEEFE854]" id={name}>
              <SelectValue placeholder="Select a destination" />
            </SelectTrigger>
            <SelectContent>
              {destinationOptions.map(({ label, value }) => {
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
