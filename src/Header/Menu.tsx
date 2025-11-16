'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Menu as MenuIcon, X } from 'lucide-react'

interface Props {
  links: Header['navItems'] | null
  cta: Header['cta'] | null
}

export const Menu = ({ links, cta }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="flex lg:hidden">
      <span onClick={() => setIsOpen(!isOpen)} className="text-primary cursor-pointer">
        {isOpen ? <X /> : <MenuIcon />}
      </span>
      {isOpen && (
        <div className="absolute z-50 w-full top-full left-0 shadow-md bg-muted py-4 px-6">
          <ul className="flex flex-col gap-2 text-md">
            {links?.map((item) => (
              <li key={item.id} className="block [&:not(:last-child)]:border-b py-1">
                <CMSLink className="block" {...item.link} />
              </li>
            ))}
          </ul>
          {cta && (
            <CMSLink
              className="mt-3 rounded-3xl px-6 leading-[1.7] w-full"
              appearance="default"
              {...cta}
            />
          )}
        </div>
      )}
    </div>
  )
}
