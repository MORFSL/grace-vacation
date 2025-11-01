import type { Block } from 'payload'

export const DestinationSelectBlock: Block = {
  slug: 'destinationSelect',
  interfaceName: 'DestinationSelectBlock',
  labels: {
    plural: 'Destination Select',
    singular: 'Destination Select',
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
    {
      name: 'destinations',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true,
      required: false,
      label: 'Select Destinations',
      admin: {
        description: 'Choose one or more destinations to display',
      },
    },
  ],
}
