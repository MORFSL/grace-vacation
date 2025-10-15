import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Itinerary } from '@/payload-types'

export const revalidateItinerary: CollectionAfterChangeHook<Itinerary> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/tours/${doc.slug}`

      payload.logger.info(`Revalidating itinerary at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/tours')
      revalidateTag('itineraries-sitemap')
    }

    // If the itinerary was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/tours/${previousDoc.slug}`

      payload.logger.info(`Revalidating old itinerary at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/tours')
      revalidateTag('itineraries-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Itinerary> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/tours/${doc?.slug}`
    revalidatePath(path)
    revalidatePath('/tours')
    revalidateTag('itineraries-sitemap')
  }

  return doc
}
