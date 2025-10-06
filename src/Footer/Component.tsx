import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Contact, Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Socials } from '@/socials/Component'
import { Media } from '@/components/Media'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 2)()
  const contacts: Contact = await getCachedGlobal('contacts', 2)()
  const navItems = footer?.navItems || []

  return (
    <footer className="mt-auto">
      <div className="px-4 mx-auto container py-8 bg-muted">
        <div className="flex flex-col md:flex-row w-full justify-between gap-4">
          {footer.phoneLabel && (
            <div className="flex items-center gap-2">
              <span>{footer.phoneLabel}</span>
              <Link className="flex items-center" href={'tel:' + contacts?.phone}>
                {contacts?.phone}
              </Link>
            </div>
          )}
          {footer.socialsLabel && (
            <div className="flex items-center gap-2">
              <span>{footer.socialsLabel}</span>
              <Socials />
            </div>
          )}
        </div>
        <nav className="border-t flex flex-col md:flex-row w-full justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="text-lg font-medium">Contacts</div>
            <div className="mt-6 flex flex-col gap-3">
              <div className="whitespace-pre-wrap">{contacts?.address}</div>
              <div>{contacts?.email}</div>
            </div>
          </div>
          {navItems.map(({ item }, idx) => {
            return (
              <div key={idx}>
                <div className="text-lg font-medium">{item?.name}</div>
                <div className="mt-6 flex flex-col gap-3">
                  {item?.links?.map(({ link }, idx) => {
                    return <CMSLink key={idx} {...link} />
                  })}
                </div>
              </div>
            )
          })}
        </nav>
        {footer.paymentMethods && (
          <div className="flex items-center gap-4">
            <div>{footer.paymentMethods.label}</div>
            <div className="flex items-center gap-4">
              {footer.paymentMethods.method?.map((method) => {
                return (
                  <Media
                    key={method?.id}
                    resource={method?.image}
                    className="rounded w-10 h-10 bg-white"
                  />
                )
              })}
            </div>
          </div>
        )}
      </div>
      <small className="px-4 mx-auto container flex gap-4 justify-between text-muted-foreground text-sm">
        {footer.copyright && (
          <div>{footer.copyright.replace('[year]', new Date().getFullYear().toString())}</div>
        )}
        <div>Designed by morf</div>
      </small>
    </footer>
  )
}
