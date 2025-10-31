import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

type DateFieldProps = {
  name: string
  label: string
  required?: boolean
  width?: number | string
  defaultValue?: string
  errors: Partial<FieldErrorsImpl>
  register: UseFormRegister<FieldValues>
}

export const Date: React.FC<DateFieldProps> = ({
  name,
  label,
  required,
  width,
  defaultValue,
  errors,
  register,
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
      <Input
        defaultValue={defaultValue}
        id={name}
        type="date"
        className="border-[#AD252F1A] bg-[#FEEFE854]"
        {...register(name, { required })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
