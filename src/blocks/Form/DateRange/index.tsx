'use client'

import React from 'react'
import { format } from 'date-fns'
import type { DateRange as DateRangeType } from 'react-day-picker'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities/ui'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

type DateRangeFieldProps = {
  name: string
  label: string
  required?: boolean
  width?: number | string
  defaultValue?: string
  errors: Partial<FieldErrorsImpl>
  control: Control
}

export const DateRange: React.FC<DateRangeFieldProps> = ({
  name,
  label,
  required,
  width,
  defaultValue,
  errors,
  control,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} className="text-[15px] font-medium">
        {label}

        {required && (
          <span className="required text-[#AD252F] ml-1">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          // Parse value from string format "YYYY-MM-DD,YYYY-MM-DD" or single date
          const parseValue = (val: string | undefined): DateRangeType | undefined => {
            if (!val) return undefined
            const dates = val.split(',')
            if (dates.length === 2) {
              const from = new Date(dates[0] ?? '')
              const to = new Date(dates[1] ?? '')
              if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
                return { from, to }
              }
            } else if (dates.length === 1) {
              const from = new Date(dates[0] ?? '')
              if (!isNaN(from.getTime())) {
                return { from }
              }
            }
            return undefined
          }

          const dateRange =
            typeof value === 'string' ? parseValue(value) : (value as DateRangeType | undefined)

          const handleSelect = (range: DateRangeType | undefined) => {
            if (range?.from) {
              if (range.to) {
                onChange(`${format(range.from, 'yyyy-MM-dd')},${format(range.to, 'yyyy-MM-dd')}`)
              } else {
                onChange(format(range.from, 'yyyy-MM-dd'))
              }
            } else {
              onChange(undefined)
            }
          }

          return (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  id={name}
                  className={cn(
                    'w-full justify-start text-left font-normal border border-[#AD252F1A] bg-[#FEEFE854] rounded-md px-3 py-2 text-sm',
                    !dateRange && 'text-muted-foreground',
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
                    <span>Select date range</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from || new Date()}
                  selected={dateRange}
                  onSelect={handleSelect}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          )
        }}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
