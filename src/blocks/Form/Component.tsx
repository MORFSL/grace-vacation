'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useMemo, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'

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

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    formImage,
    alignment,
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

  const imageContent = formImage && typeof formImage !== 'number' && (
    <div className="rounded-xl w-full h-fit bg-muted order-1 md:order-none">
      <div className="relative  overflow-hidden w-full">
        <Media resource={formImage} className="w-full h-full object-cover" />
        <div className="absolute left-0 -bottom-1 right-0 w-full">
          <svg
            className="w-full h-auto"
            viewBox="0 0 677 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect
              y="33.2163"
              width="33.2163"
              height="677"
              transform="rotate(-90 0 33.2163)"
              fill="url(#pattern0_248_389)"
            />
            <defs>
              <pattern
                id="pattern0_248_389"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_248_389"
                  transform="matrix(0.0339693 0 0 0.00166667 -0.179386 0)"
                />
              </pattern>
              <image
                id="image0_248_389"
                width="40"
                height="600"
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </div>
      </div>
      <div className="p-[51px]">
        {formImage.caption && (
          <RichText
            className="!p-0 text-black prose-h2:text-2xl prose-h2:mb-3"
            style={{ padding: 0 }}
            data={formImage.caption}
          />
        )}
      </div>
    </div>
  )

  const formContent = (
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

  return (
    <div className="container">
      {formImage && typeof formImage !== 'number' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {alignment === 'right' ? (
            <>
              {formContent}
              {imageContent}
            </>
          ) : (
            <>
              {imageContent}
              {formContent}
            </>
          )}
        </div>
      ) : (
        <div className="lg:max-w-[48rem] mx-auto">{formContent}</div>
      )}
    </div>
  )
}
