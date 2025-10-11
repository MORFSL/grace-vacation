'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Menu as MenuIcon, X } from 'lucide-react'

interface Props {
  links: Header['navItems'] | null
}

export const Menu = ({ links }: Props) => {
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
        <ul className="absolute z-50 w-full top-full left-0 bg-muted flex flex-col gap-2 py-4 px-6 text-md">
          {links?.map((item) => (
            <li key={item.id} className="block [&:not(:last-child)]:border-b py-1">
              <CMSLink {...item.link} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
