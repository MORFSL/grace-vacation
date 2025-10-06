import { Facebook, Instagram, Linkedin, LucideProps, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'

import type { Social } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { cn } from '@/utilities/ui'

interface Props {
  className?: React.HTMLAttributes<HTMLDivElement>['className']
  size?: LucideProps['size']
}

export async function Socials({ className, size = 18 }: Props) {
  const socials = (await getCachedGlobal('socials', 1)()) as Social

  return (
    <div className={cn('flex text-primary', className)}>
      {socials.instagram && (
        <Link href={socials.instagram} target="_blank" rel="noopener noreferrer">
          <Instagram size={size} />
        </Link>
      )}
      {socials.facebook && (
        <Link href={socials.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook size={size} />
        </Link>
      )}
      {socials.twitter && (
        <Link href={socials.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter size={size} />
        </Link>
      )}
      {socials.linkedin && (
        <Link href={socials.linkedin} target="_blank">
          <Instagram size={size} />
        </Link>
      )}
      {socials.linkedin && (
        <Link href={socials.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin size={size} />
        </Link>
      )}
      {socials.youtube && (
        <Link href={socials.youtube} target="_blank" rel="noopener noreferrer">
          <Youtube size={size} />
        </Link>
      )}
    </div>
  )
}
