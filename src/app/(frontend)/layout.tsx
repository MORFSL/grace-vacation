import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Work_Sans } from 'next/font/google'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getServerSideURL } from '@/utilities/getURL'
import { GoogleAnalytics } from '@next/third-parties/google'
import { General } from '@/payload-types'

import './globals.css'
import 'swiper/css'
import 'swiper/css/pagination'
import { getCachedGlobal } from '@/utilities/getGlobals'

const workSans = Work_Sans({
  subsets: ['latin'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const general: General = (await getCachedGlobal('general', 1)()) as General

  return (
    <html className={cn(workSans.className)} lang="en" suppressHydrationWarning>
      <head>
        {general.favicon && typeof general.favicon === 'object' && general.favicon.url ? (
          <link href={general.favicon.url} rel="icon" sizes="32x32" />
        ) : (
          <link href="/favicon.ico" rel="icon" sizes="32x32" />
        )}
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
      {general.seo?.googleAnalyticsId && <GoogleAnalytics gaId={general.seo.googleAnalyticsId} />}
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: await mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
