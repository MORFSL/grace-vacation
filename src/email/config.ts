import type { GlobalConfig } from 'payload'

export const Email: GlobalConfig = {
  slug: 'email',
  label: 'Emails',
  fields: [
    {
      name: 'adminEmail',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address to receive email notifications.',
      },
    },
    {
      name: 'signatureName',
      type: 'text',
      required: true,
      admin: {
        description: 'Company name used in email signatures.',
      },
    },
  ],
}
