import { GlobalConfig } from 'payload'
import { revalidateGeneral } from './hooks/revalidateGeneral'

export const General: GlobalConfig = {
  slug: 'general',
  label: 'General',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      admin: {
        description: 'The name of the site.',
      },
      defaultValue: 'Payload Website Template',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: {
          contains: 'image/',
        },
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'The favicon of the site. (Recommended size: 32x32)',
      },
      filterOptions: {
        mimeType: {
          contains: 'image/',
        },
      },
    },
    {
      name: 'payments',
      type: 'group',
      fields: [
        {
          name: 'currencyLabel',
          type: 'select',
          options: [
            { label: '$', value: '$' },
            { label: 'Rs.', value: 'Rs.' },
            { label: 'LKR', value: 'LKR' },
          ],
          admin: {
            description: 'Currency label displayed throughout the site.',
          },
        },
      ],
    },
    {
      name: 'itinerary',
      type: 'group',
      fields: [
        {
          name: 'pricePrefix',
          type: 'text',
          admin: {
            description: 'This will be displayed before the price (Ex: Start from)',
          },
        },
        {
          name: 'coordinator',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'phone',
                  type: 'text',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        {
          name: 'milestonesTitle',
          type: 'text',
          admin: {
            description: 'The title of the itinerary milestones section.',
          },
          defaultValue: 'Tour Milestones',
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'platform',
              type: 'select',
              admin: {
                width: '50%',
              },
              options: [
                { label: 'Google Reviews', value: 'Google Reviews' },
                { label: 'Trip Advisor', value: 'Trip Advisor' },
                { label: 'Facebook', value: 'Facebook' },
              ],
            },
            {
              name: 'rating',
              type: 'number',
              admin: {
                step: 0.1,
                width: '50%',
              },
              min: 0,
              max: 10,
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      label: 'SEO',
      admin: {
        description: 'SEO settings for the site.',
      },
      type: 'group',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          admin: {
            placeholder: 'G-XYZ',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGeneral],
  },
}
