'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useMemo, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Media as MediaType } from '@/payload-types'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
  formImage?: MediaType | number
  alignment?: 'left' | 'right'
}

export const FormBlockClient: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const searchParams = useSearchParams()

  // Extract query params once
  const destination = searchParams.get('destination')
  const arrival = searchParams.get('arrival')
  const departure = searchParams.get('departure')
  const type = searchParams.get('type')

  // Build default values from hardcoded query param keys
  const defaultValues = useMemo(() => {
    const values: Record<string, string | undefined> = {}

    if (!formFromProps.fields) return values

    // Map query params to form fields
    formFromProps.fields.forEach((field) => {
      if (!('name' in field) || !field.name) return

      const fieldName = field.name.toLowerCase()
      const blockType = 'blockType' in field ? field.blockType : undefined

      // Set default value from field if it exists
      if (
        'defaultValue' in field &&
        field.defaultValue !== undefined &&
        field.defaultValue !== null
      ) {
        values[field.name] = String(field.defaultValue)
      }

      if (destination && fieldName.includes('destination')) {
        values[field.name] = destination
      }

      if (type && fieldName.includes('type')) {
        values[field.name] = type
      }

      if (arrival && (blockType as string) === 'dateRange') {
        values[field.name] = departure ? `${arrival},${departure}` : arrival
      } else if (arrival && fieldName.includes('arrival')) {
        values[field.name] = arrival
      }
    })

    return values
  }, [formFromProps.fields, destination, arrival, departure, type])

  const formMethods = useForm<Record<string, string | undefined>>({
    defaultValues,
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Record<string, string | undefined>) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)
        setShowSuccess(false)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) {
              setHasSubmitted(true)
              router.push(redirectUrl)
            }
          } else {
            // Show success message and reset form
            setShowSuccess(true)
            reset()
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, reset],
  )

  return (
    <div className="p-4 lg:p-6">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText
          className="mb-8 lg:mb-12 max-w-[437px] mx-0"
          data={introContent}
          enableGutter={false}
        />
      )}

      <FormProvider {...formMethods}>
        {showSuccess && confirmationMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <RichText
              className="text-green-800 font-medium"
              data={confirmationMessage}
              enableProse={false}
              enableGutter={false}
            />
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 font-medium">{`${error.status || '500'}: ${error.message || ''}`}</p>
          </div>
        )}
        {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
        {!hasSubmitted && (
          <form id={formID} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-5">
              {formFromProps &&
                formFromProps.fields &&
                formFromProps.fields?.map((field, index) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    return (
                      <Field
                        key={index}
                        form={formFromProps}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    )
                  }
                  return null
                })}
            </div>

            <Button form={formID} type="submit" variant="default" className="mt-6 w-full">
              {submitButtonLabel}
            </Button>
          </form>
        )}
      </FormProvider>
    </div>
  )
}
