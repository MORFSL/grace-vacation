import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { General, Itinerary } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { TourMetaSection } from './TourMetaSection'
import { TourGallerySection } from './TourGallerySection'
import { TourPackage } from './TourPackage'
import { TourContents } from './TourContents'
import { TourInquiry } from './TourInquiry'
import { TourBenefits } from './TourBenefits'
import { TourCoordinator } from './TourCoordinator'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { TourTags } from './TourTags'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const itineraries = await payload.find({
    collection: 'itineraries',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = itineraries.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Itinerary({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/tours/' + slug
  const itinerary = await queryItineraryBySlug({ slug })
  const general = (await getCachedGlobal('general')()) as General

  if (!itinerary) return <PayloadRedirects url={url} />

  return (
    <article className="py-2">
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <TourMetaSection itinerary={itinerary} />
      <TourGallerySection itinerary={itinerary} />

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-1 md:col-span-9">
            <TourTags itinerary={itinerary} />
            <TourContents itinerary={itinerary} />
            <TourPackage itinerary={itinerary} />
          </div>
          <div className="col-span-1 md:col-span-3">
            <TourInquiry itinerary={itinerary} general={general} />
            <TourBenefits itinerary={itinerary} />
            <TourCoordinator itinerary={general.itinerary} />
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const itinerary = await queryItineraryBySlug({ slug })

  return generateMeta({ doc: itinerary })
}

const queryItineraryBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'itineraries',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
