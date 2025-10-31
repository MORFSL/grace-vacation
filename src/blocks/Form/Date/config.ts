import type { Block } from 'payload'

export const DateBlock: Block = {
  slug: 'date',
  interfaceName: 'DateBlock',
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
        description: 'Width of the field as a percentage (e.g., 50 for half width, 100 for full width)',
      },
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
    },
  ],
  labels: {
    plural: 'Date Fields',
    singular: 'Date Field',
  },
}
