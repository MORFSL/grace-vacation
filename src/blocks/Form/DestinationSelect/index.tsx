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

type DestinationSelectProps = {
  destinations?: (number | Destination)[] | null
  control: Control
  errors: Partial<FieldErrorsImpl>
}

export const DestinationSelect: React.FC<DestinationSelectProps> = ({
  destinations,
  control,
  errors,
}) => {
  const name = 'destination'

  // Convert destinations to options, filtering out any that are just IDs
  const destinationOptions =
    destinations
      ?.filter((dest): dest is Destination => typeof dest === 'object')
      .map((dest) => ({
        label: dest.title,
        value: dest.title,
      })) || []

  return (
    <div className="mb-6">
      <Label htmlFor={name}>Destination</Label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = destinationOptions.find((t) => t.value === value)

          return (
            <Select onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
              <SelectTrigger className="w-full" id={name}>
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
    </div>
  )
}
