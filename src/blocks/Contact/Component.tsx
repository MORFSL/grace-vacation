import React from 'react'
import { MapPin, Phone } from 'lucide-react'

import type { ContactBlock as ContactBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const ContactBlock: React.FC<ContactBlockProps> = ({
  content,
  phone,
  email,
  address,
  mapEmbed,
}) => {
  return (
    <div className="px-8 mx-auto container">
      <div className="flex flex-col gap-12 lg:gap-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {content && (
            <div className="flex-1 lg:max-w-xl">
              <RichText
                data={content}
                enableGutter={false}
                className="mb-0 !text-center lg:!text-start"
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 lg:gap-24">
            {(phone || email) && (
              <div className="flex flex-col max-lg:items-center max-lg:text-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Contact Info</h3>
                  <div className="flex flex-col gap-1 text-muted-foreground">
                    {phone && (
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="hover:text-primary transition-colors"
                      >
                        {phone}
                      </a>
                    )}
                    {email && (
                      <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                        {email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
            {address && (
              <div className="flex flex-col max-lg:items-center max-lg:text-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Address</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{address}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {mapEmbed && (
          <div className="w-full rounded-xl overflow-hidden bg-muted relative">
            <div
              className="w-full h-[250px] lg:h-[400px] [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
              style={{
                filter: 'contrast(0.9) saturate(0.9)',
              }}
              dangerouslySetInnerHTML={{ __html: mapEmbed }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
