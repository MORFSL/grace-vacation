import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import React from 'react'

export const Hidden: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, register }) => {
  return (
    <Input
      defaultValue={defaultValue}
      id={name}
      type="hidden"
      style={{ opacity: 0, display: 'none' }}
      {...register(name)}
    />
  )
}
