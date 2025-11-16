import type { Metadata } from 'next'

import type { Media, Page, Itinerary, Config, General } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getCachedGlobal } from './getGlobals'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    if (ogUrl) {
      return serverUrl + ogUrl
    }
  }

  return null
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Itinerary> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const general: General = (await getCachedGlobal('general', 1)()) as General
  const title = doc?.meta?.title ? doc?.meta?.title + ' | ' + general.siteName : general.siteName

  return {
    description: doc?.meta?.description,
    openGraph: await mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
