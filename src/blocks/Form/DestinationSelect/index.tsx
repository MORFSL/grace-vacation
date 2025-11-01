import type { Control, FieldErrorsImpl } from 'react-hook-form'
import type { Destination } from '@/payload-types'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

type DestinationSelectProps = {
  name: string
  label: string
  control: Control
  errors: Partial<FieldErrorsImpl>
  destinations?: (number | Destination)[] | null
  width?: number
}

export const DestinationSelect: React.FC<DestinationSelectProps> = ({
  name,
  label,
  control,
  errors,
  destinations,
  width,
}) => {
  const destinationOptions =
    destinations
      ?.filter((dest): dest is Destination => typeof dest === 'object')
      .map((dest) => ({
        label: dest.title,
        value: dest.title,
      })) || []

  return (
    <Width width={width}>
      <Label htmlFor={name} className="text-[15px] font-medium">
        {label}
      </Label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = destinationOptions.find((t) => t.value === value)

          return (
            <Select onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
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
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
