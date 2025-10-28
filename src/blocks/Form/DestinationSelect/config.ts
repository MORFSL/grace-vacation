import type { Block } from 'payload'

export const DestinationSelectBlock: Block = {
  slug: 'destinationSelect',
  interfaceName: 'DestinationSelectBlock',
  fields: [
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
  labels: {
    plural: 'Destination Select Blocks',
    singular: 'Destination Select Block',
  },
}
