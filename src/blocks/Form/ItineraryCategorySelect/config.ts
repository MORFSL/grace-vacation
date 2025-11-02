import type { Block } from 'payload'

export const ItineraryCategorySelectBlock: Block = {
  slug: 'itineraryCategorySelect',
  interfaceName: 'ItineraryCategorySelectBlock',
  labels: {
    plural: 'Itinerary Category Select',
    singular: 'Itinerary Category Select',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      admin: {
        description: 'Field name (lowercase, no spaces)',
      },
    },
    {
      name: 'label',
      type: 'text',
      label: 'Label',
      required: true,
    },
    {
      name: 'width',
      type: 'number',
      label: 'Field Width (%)',
      admin: {
        description:
          'Width of the field as a percentage (e.g., 50 for half width, 100 for full width)',
      },
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
    },
  ],
}
