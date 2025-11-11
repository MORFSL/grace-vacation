import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'
import { Socials } from '@/socials/Component'
import { Menu } from './Menu'

export async function Header() {
  const header = (await getCachedGlobal('header', 1)()) as Header

  if (!header.navItems?.length) {
    return null
  }

  return (
    <header className="relative container mx-auto">
      <div className="flex justify-between items-center py-6">
        <div className="w-[180px] h-full">
          <Logo />
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
          {header.cta && (
            <CMSLink
              className="hidden lg:block rounded-3xl px-6 leading-[1.7]"
              appearance="default"
              {...header.cta}
            />
          )}
          <Socials className="hidden lg:flex gap-6" size={20} />
        </div>
      </div>
    </header>
  )
}
