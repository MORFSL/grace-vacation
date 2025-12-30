import React from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'

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
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          {content && (
            <div className="w-full max-w-4xl">
              <RichText data={content} enableGutter={false} className="mb-0 !text-center" />
            </div>
          )}

          <div className="px-0 xl:px-48 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24 w-full">
            {phone && (
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Phone Number</h3>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            )}
            {address && (
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Address</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{address}</p>
                </div>
              </div>
            )}
            {email && (
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email Address</h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
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
