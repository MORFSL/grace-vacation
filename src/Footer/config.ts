import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Navigation Groups',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'group',
          label: 'Group',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Name',
            },
            {
              name: 'links',
              type: 'array',
              fields: [link({ appearances: false })],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Footer/RowLabel#RowLabel',
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'phoneLabel',
      type: 'text',
      label: 'Phone Label',
      admin: {
        description: 'The label to display for the phone number.',
      },
    },
    {
      name: 'socialsLabel',
      type: 'text',
      label: 'Socials Label',
      admin: {
        description: 'The label to display for the socials.',
      },
    },
    {
      name: 'paymentMethods',
      type: 'group',
      label: 'Payment Methods',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'method',
          type: 'array',
          fields: [
            {
              name: 'method',
              type: 'text',
              label: 'Method',
            },
            {
              name: 'image',
              type: 'upload',
              label: 'Image',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright',
      admin: {
        description: 'Insert [year] to automatically add the current year.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
