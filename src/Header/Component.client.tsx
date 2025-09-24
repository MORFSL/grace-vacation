'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, WebsiteGlobal } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

interface HeaderClientProps {
  data: Header
  websiteGlobals: WebsiteGlobal
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, websiteGlobals }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  console.log({ websiteGlobals })

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header {...(theme ? { 'data-theme': theme } : {})}>
      {/* logo */}
      <Logo logoFromCMS={websiteGlobals.logo} />
      {/* Nav Items */}
      <h2>Nav Items</h2>
      {data.navItems?.map((item) => (
        <div key={item.id}>
          <CMSLink {...item.link} />
        </div>
      ))}

      {/* CTA Link */}
      {data.ctaLink?.link && (
        <>
          <h2>CTA Link</h2>
          <CMSLink {...data.ctaLink.link} />
        </>
      )}

      {/* Nav Groups */}
      {data.navGroups?.length ? (
        <>
          <h2>Nav Groups</h2>
          {data.navGroups.map((group, idx) => (
            <div key={idx}>
              <h3>{group.groupName}</h3>
              {group.links?.map((linkItem) => (
                <div key={linkItem.id}>
                  <CMSLink {...linkItem.link} />
                </div>
              ))}
            </div>
          ))}
        </>
      ) : null}
    </header>
  )
}
