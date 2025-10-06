import { GlobalConfig } from 'payload'
import { revalidateSocials } from './hooks/revalidateSocials'

export const Socials: GlobalConfig = {
  slug: 'socials',
  label: 'Socials',
  fields: [
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'text',
      admin: {
        description: 'The public URL of the social media profile.',
      },
    },
    {
      name: 'facebook',
      label: 'Facebook',
      type: 'text',
      admin: {
        description: 'The public URL of the social media profile.',
      },
    },
    {
      name: 'twitter',
      label: 'Twitter',
      type: 'text',
      admin: {
        description: 'The public URL of the social media profile.',
      },
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      type: 'text',
      admin: {
        description: 'The public URL of the social media profile.',
      },
    },
    {
      name: 'youtube',
      label: 'YouTube',
      type: 'text',
      admin: {
        description: 'The public URL of the social media profile.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSocials],
  },
}
