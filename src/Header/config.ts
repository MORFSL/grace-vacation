import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      required: false,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
        description: 'The links shown in the base nav bar',
      },
    },
    {
      name: 'ctaLink',
      label: 'CTA Link',
      type: 'group',
      fields: [
        link({
          appearances: ['default', 'outline', 'secondary'],
        }),
      ],

      admin: {
        description: 'Optional call-to-action link (e.g. button in header)',
      },
    },
    {
      name: 'navGroups',
      label: 'Navigation Groups',
      type: 'array',
      required: false,
      admin: {
        initCollapsed: true,
        description: 'Grouped nav sections, each with a name and multiple links',
      },
      fields: [
        {
          name: 'groupName',
          type: 'text',
          required: false,
          label: 'Group Name',
        },
        {
          name: 'links',
          type: 'array',
          required: false,
          fields: [
            link({
              appearances: ['default', 'outline', 'secondary'],
            }),
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
