import type { Block } from 'payload'

export const HiddenBlock: Block = {
  slug: 'hidden',
  interfaceName: 'HiddenBlock',
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
      admin: {
        description: 'Label for admin purposes (not visible to users)',
      },
    },
    {
      name: 'defaultValue',
      type: 'text',
      label: 'Default Value',
      admin: {
        description: 'Default value for the hidden field',
      },
    },
  ],
  labels: {
    plural: 'Hidden Fields',
    singular: 'Hidden Field',
  },
}
