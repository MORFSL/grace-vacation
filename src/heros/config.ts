import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',

      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Hero Inquiry',
          value: 'highImpact',
        },
        {
          label: 'Hero Minimal',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'lowImpact'].includes(type),
      },
      relationTo: 'media',
    },
    {
      name: 'redirect',
      type: 'relationship',
      relationTo: 'pages',
      required: false,
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
        description: 'Redirect users to a form page to submit their inquiry.',
      },
    },
  ],
  label: false,
}
