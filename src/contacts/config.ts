import { GlobalConfig } from 'payload'
import { revalidateContacts } from './hooks/revalidateContacts'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Contacts',
  fields: [
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
  ],
  hooks: {
    afterChange: [revalidateContacts],
  },
}
