import type { Control, FieldErrorsImpl } from 'react-hook-form'
import type { ItineraryCategory } from '@/payload-types'

import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { ItineraryCategorySelectClient as Select } from './Select.client'
import { getClientSideURL } from '@/utilities/getURL'

type ItineraryCategorySelectProps = {
  name: string
  label: string
  control: Control
  errors: Partial<FieldErrorsImpl>
  itineraryCategories?: (number | ItineraryCategory)[] | null
  width?: number
  required?: boolean
  defaultValue?: string
}

export const ItineraryCategorySelect: React.FC<ItineraryCategorySelectProps> = ({
  name,
  label,
  control,
  errors,
  width,
  required,
  defaultValue,
}) => {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${getClientSideURL()}/api/itineraryCategories`, {
          next: {
            revalidate: 60,
          },
        })
        const json = await res.json()

        if (json?.docs) {
          setDocs(json.docs)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchData()
  }, [])

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
      <Select
        name={name}
        control={control}
        itineraryCategories={docs}
        required={required}
        defaultValue={defaultValue}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
