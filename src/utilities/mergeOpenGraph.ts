import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { Config, General, Media } from '@/payload-types'
import { getCachedGlobal } from './getGlobals'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'An open-source website built with Payload and Next.js.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: 'Payload Website Template',
  title: 'Payload Website Template',
}

const getImageURL = async (images?: Media[] | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  const general: General = (await getCachedGlobal('general', 1)()) as General
  const image = images && Array.isArray(images) ? images[0] : images

  const defaultImage =
    general.seo?.ogImage && typeof general.seo.ogImage === 'object' && 'url' in general.seo.ogImage
      ? general.seo.ogImage.url
      : undefined

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    if (ogUrl) {
      return serverUrl + ogUrl
    }
  }

  if (defaultImage) {
    return serverUrl + defaultImage
  }

  return serverUrl + '/website-template-OG.webp'
}

export const mergeOpenGraph = async (
  og?: Metadata['openGraph'],
): Promise<Metadata['openGraph']> => {
  const general: General = (await getCachedGlobal('general', 1)()) as General

  return {
    ...defaultOpenGraph,
    siteName: general.siteName,
    title: general.siteName,
    ...og,
    images: og?.images
      ? og.images
      : [
          {
            url: await getImageURL(),
          },
        ],
  }
}
