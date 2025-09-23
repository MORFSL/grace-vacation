import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const NEXT_PUBLIC_BLOB_URL = process.env.NEXT_PUBLIC_BLOB_URL

function buildRemotePattern(urlString) {
  if (!urlString) return null
  try {
    const url = new URL(urlString)
    return {
      protocol: url.protocol.replace(':', ''),
      hostname: url.hostname,
    }
  } catch {
    return null
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      buildRemotePattern(NEXT_PUBLIC_SERVER_URL),
      buildRemotePattern(NEXT_PUBLIC_BLOB_URL),
    ].filter(Boolean), // remove null entries
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
