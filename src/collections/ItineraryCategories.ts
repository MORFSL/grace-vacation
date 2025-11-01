import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ItineraryCategories: CollectionConfig = {
  slug: 'itineraryCategories',
  labels: {
    singular: 'Itinerary Category',
    plural: 'Itinerary Categories',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: anyone,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
