import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import React, { Suspense } from 'react'
import RichText from '@/components/RichText'

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Media as MediaType } from '@/payload-types'
import { FormBlockClient } from './Component.client'
import Image from 'next/image'
import { Media } from '@/components/Media'
import { Skeleton } from '@/components/ui/skeleton'

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
  const { formImage, alignment } = props

  const imageContent = formImage && typeof formImage !== 'number' && (
    <div className="rounded-xl w-full h-fit bg-muted order-1 md:order-none">
      <div className="relative  overflow-hidden w-full">
        <Media resource={formImage} className="w-full h-full object-cover" />
        <div className="absolute left-0 -bottom-1 right-0 w-full">
          <Image
            src="/static-media/horizontal-wave-overlay.webp"
            alt="Horizontal wave overlay"
            width={700}
            height={80}
          />
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

  return (
    <div className="container">
      {formImage && typeof formImage !== 'number' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {alignment === 'right' ? (
            <>
              <Suspense fallback={<Skeleton className="w-full h-full" />}>
                <FormBlockClient {...props} />
              </Suspense>
              {imageContent}
            </>
          ) : (
            <>
              {imageContent}
              <Suspense fallback={<Skeleton className="w-full h-full" />}>
                <FormBlockClient {...props} />
              </Suspense>
            </>
          )}
        </div>
      ) : (
        <div className="lg:max-w-[48rem] mx-auto">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <FormBlockClient {...props} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
