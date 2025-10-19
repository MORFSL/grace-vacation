import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateItinerary } from './hooks/revalidateItinerary'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { Content } from '@/blocks/Content/config'
import { TestimonialsBlock } from '@/blocks/Testimonials/config'
import { FAQBlock } from '@/blocks/Faq/config'

export const Itineraries: CollectionConfig = {
  slug: 'itineraries',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'itineraries',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'itineraries',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'destination',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'priceType',
          type: 'select',
          options: [
            {
              label: 'Per Person',
              value: 'person',
            },
            {
              label: 'Group',
              value: 'group',
            },
            {
              label: 'Family',
              value: 'family',
            },
            {
              label: 'Couple',
              value: 'couple',
            },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
            },
            {
              name: 'duration',
              type: 'text',
            },
            {
              name: 'benefits',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    {
                      name: 'benefit',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: 'content',
              type: 'blocks',
              label: 'Content',
              blocks: [Content],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
            {
              name: 'inclusions',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    {
                      name: 'inclusion',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: 'exclusions',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    {
                      name: 'exclusion',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: 'milestones',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'content',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                        UnorderedListFeature(),
                        OrderedListFeature(),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                      ]
                    },
                  }),
                },
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                  hasMany: true,
                },
              ],
            },
            {
              name: 'mapEmbed',
              type: 'textarea',
            },
            {
              name: 'otherBlocks',
              type: 'blocks',
              label: 'Other Layout Blocks',
              blocks: [TestimonialsBlock, FAQBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateItinerary],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
