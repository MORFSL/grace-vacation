import { GlobalConfig } from 'payload'
import { revalidateWebsiteGlobals } from './hooks/revalidateWebsiteGlobals'

export const WebsiteGlobals: GlobalConfig = {
  slug: 'websiteGlobals',
  label: 'Website Globals',
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media', // assumes you already have a "media" collection
      required: true,
      filterOptions: {
        mimeType: {
          contains: 'image/', // ensures only images can be selected
        },
      },
      admin: {
        description: 'Upload your website logo. Supported formats: PNG, JPG, JPEG, WEBP, GIF, SVG.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateWebsiteGlobals],
  },
}
