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
  formTitle?: string | null
  alignment?: 'left' | 'right'
}

export const FormBlockClient: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
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
            // Show success message and hide form
            setHasSubmitted(true)
            setShowSuccess(true)
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
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="p-4 lg:p-6">
      {props.formTitle && <h3 className="text-3xl font-semibold mb-5">{props.formTitle}</h3>}
      <FormProvider {...formMethods}>
        {showSuccess && confirmationMessage && (
          <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="flex-1">
                <RichText
                  className="text-green-800 font-medium"
                  data={confirmationMessage}
                  enableProse={false}
                  enableGutter={false}
                />
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="mb-6 p-6 bg-red-50 border-2 border-red-200 rounded-lg shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-red-800 font-medium">{`${error.status || '500'}: ${error.message || ''}`}</p>
              </div>
            </div>
          </div>
        )}
        {isLoading && !hasSubmitted && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-muted-foreground font-medium">Submitting your inquiry...</p>
            </div>
          </div>
        )}
        {!hasSubmitted && !isLoading && (
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
