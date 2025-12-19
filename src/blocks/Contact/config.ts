import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Contact: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlock',
  imageURL: '/static-media/contact-block.webp',
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
    },
    {
      name: 'mapEmbed',
      type: 'textarea',
      admin: {
        description: 'Enter the embed code for the map. (https://www.google.com/maps/d)',
      },
    },
  ],
  labels: {
    plural: 'Contact',
    singular: 'Contact Block',
  },
}
