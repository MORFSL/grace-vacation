import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'
import { Socials } from '@/socials/Component'
import { Menu } from './Menu'

export async function Header() {
  const header = (await getCachedGlobal('header', 1)()) as Header

  return (
    <header className="relative container mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <div className="w-[180px] h-full">
          {header.logo && <Logo media={header.logo} className="object-contain" />}
        </div>
        <div className="flex gap-12 items-center">
          {header.navItems && (
            <>
              <div className="hidden lg:flex gap-12">
                {header.navItems.map((item) => (
                  <div key={item.id} className="font-medium">
                    <CMSLink {...item.link} />
                  </div>
                ))}
              </div>
              <Menu links={header.navItems} />
            </>
          )}
          {header.ctaLink?.link && (
            <CMSLink
              className="hidden lg:block rounded-3xl px-6 leading-[1.7]"
              {...header.ctaLink.link}
            />
          )}
          {header.navGroups?.length ? (
            <>
              {header.navGroups.map((group, idx) => (
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
          <Socials className="hidden lg:flex gap-6" size={20} />
        </div>
      </div>
    </header>
  )
}
