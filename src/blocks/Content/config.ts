import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
  TextStateFeature,
  AlignFeature,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'type',
    type: 'select',
    options: [
      {
        label: 'Rich Text',
        value: 'richText',
      },
      {
        label: 'Media',
        value: 'media',
      },
    ],
    defaultValue: 'richText',
  },
  {
    name: 'richText',
    type: 'richText',
    label: false,
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          UnorderedListFeature(),
          OrderedListFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          LinkFeature(),
          TextStateFeature({
            state: {
              color: {
                primaryColor: {
                  label: 'Primary Color',
                  css: {
                    color: '#AD252F',
                  },
                },
              },
              background: {
                primaryBackground: {
                  label: 'Primary Background',
                  css: {
                    'background-color': '#AD252F',
                  },
                },
              },
            },
          }),
          AlignFeature(),
        ]
      },
    }),
    admin: {
      condition: (_data, siblingData) => {
        return siblingData?.type === 'richText'
      },
    },
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: false,
    label: false,
    admin: {
      condition: (_data, siblingData) => {
        return siblingData?.type === 'media'
      },
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    admin: {
      condition: (_data, siblingData) => {
        return siblingData?.type === 'richText'
      },
    },
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  imageURL: '/static-media/content-block.webp',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
