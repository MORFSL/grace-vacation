import { General } from '@/payload-types'
import React from 'react'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Media } from '../Media'

export const Logo = async () => {
  const general = (await getCachedGlobal('general', 1)()) as General

  if (general.logo && typeof general.logo === 'object') {
    return (
      <Link href="/">
        <Media resource={general.logo} priority />
      </Link>
    )
  }

  return null
}
