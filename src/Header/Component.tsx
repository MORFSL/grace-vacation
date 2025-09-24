import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, WebsiteGlobal } from '@/payload-types'

export async function Header() {
  const headerData = (await getCachedGlobal('header', 1)()) as unknown as Header

  const websiteGlobals = (await getCachedGlobal('websiteGlobals', 2)()) as unknown as WebsiteGlobal //for logo imports and other global data

  return <HeaderClient data={headerData} websiteGlobals={websiteGlobals} />
}
