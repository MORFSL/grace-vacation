import { Media as Mediatype } from '@/payload-types'
import React from 'react'
import { Media } from '../Media'
import Link from 'next/link'

interface Props {
  className?: string
  media?: Mediatype | number
}

export const Logo = (props: Props) => {
  const { media } = props

  if (media) {
    return (
      <Link href="/">
        <Media resource={media} priority />
      </Link>
    )
  }

  return null
}
