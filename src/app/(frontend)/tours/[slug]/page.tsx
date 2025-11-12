import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import configPromise from '@payload-config'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import type { General, Itinerary } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { LivePreviewListener } from '@/components/LivePreviewListener'

import { TourMetaSection } from './TourMetaSection'
import { TourGallerySection } from './TourGallerySection'
import { TourPackage } from './TourPackage'
import { TourContents } from './TourContents'
import { TourInquiry } from './TourInquiry'
import { TourBenefits } from './TourBenefits'
import { TourCoordinator } from './TourCoordinator'
import { TourMilestones } from './TourMilestones'
import { TourMap } from './TourMap'
import { TourTags } from './TourTags'
import { TourBlocks } from './TourBlocks'

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

      <section className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {itinerary?.tags?.length ||
          itinerary?.contents?.length ||
          itinerary?.inclusions?.items?.length ||
          itinerary?.exclusions?.items?.length ? (
            <div className="col-span-1 md:col-span-8">
              <TourTags itinerary={itinerary} />
              <TourContents itinerary={itinerary} />
              <TourPackage itinerary={itinerary} />
            </div>
          ) : null}
          <div className="col-span-1 md:col-span-3 md:col-start-10">
            <div className="md:sticky top-10">
              <TourInquiry itinerary={itinerary} general={general} />
              <TourBenefits itinerary={itinerary} />
              <TourCoordinator itinerary={general.itinerary} />
            </div>
          </div>
        </div>
      </section>

      {itinerary.milestones && itinerary.milestones.length > 0 && (
        <>
          <div className="container mx-auto">
            <div className="w-full border-t border-primary/10 my-12" />
          </div>
          <section className="container mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="col-span-1 lg:col-span-8">
                <TourMilestones itinerary={itinerary} general={general} />
              </div>
              <div className="col-span-1 lg:col-span-3 lg:col-start-10">
                <div className="md:sticky mt-6 lg:mt-0 top-10">
                  <TourMap itinerary={itinerary} />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {itinerary.otherBlocks && itinerary.otherBlocks.length > 0 && (
        <>
          <div className="container mx-auto">
            <div className="w-full border-t border-primary/10 mb-12" />
          </div>
          <TourBlocks blocks={itinerary.otherBlocks} />
        </>
      )}
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
    depth: 2,
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
