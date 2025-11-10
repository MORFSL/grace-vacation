import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { General } from '@/payload-types'
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

export const mergeOpenGraph = async (
  og?: Metadata['openGraph'],
): Promise<Metadata['openGraph']> => {
  const general: General = (await getCachedGlobal('general', 1)()) as General

  return {
    ...defaultOpenGraph,
    siteName: general.siteName,
    title: general.siteName,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
