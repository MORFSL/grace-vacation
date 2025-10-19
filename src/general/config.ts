import { GlobalConfig } from 'payload'
import { revalidateGeneral } from './hooks/revalidateGeneral'

export const General: GlobalConfig = {
  slug: 'general',
  label: 'General',
  fields: [
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
  ],
  hooks: {
    afterChange: [revalidateGeneral],
  },
}
