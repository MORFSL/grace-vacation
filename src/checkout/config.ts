import { GlobalConfig } from 'payload'
import { revalidateCheckout } from './hooks/revalidateCheckout'

export const Checkout: GlobalConfig = {
  slug: 'checkout',
  label: 'Checkout',
  fields: [
    {
      name: 'currencyCode',
      type: 'select',
      options: [
        { label: 'USD', value: 'USD' },
        { label: 'LKR', value: 'LKR' },
        { label: 'EUR', value: 'EUR' },
      ],
      admin: {
        description: 'Currency code compatible with CyberSource.',
      },
    },
    {
      name: 'checkoutMerchantId',
      type: 'text',
      admin: {
        description:
          'CyberSource Secure Acceptance Profile ID - Found in Business Center > Payment Configuration > Secure Acceptance Settings.',
      },
    },
    {
      name: 'checkoutAccessKey',
      type: 'text',
      admin: {
        description:
          'CyberSource Secure Acceptance Access Key - Found in the Secure Acceptance profile.',
      },
    },
    {
      name: 'checkoutSecretKey',
      type: 'text',
      admin: {
        description:
          'CyberSource Secure Acceptance Secret Key - Used for HMAC SHA256 signature generation. Keep this secure!',
      },
    },
    {
      name: 'checkoutUrl',
      type: 'text',
      defaultValue: 'https://testsecureacceptance.cybersource.com/pay',
      admin: {
        description:
          'CyberSource Secure Acceptance Checkout URL - https://secureacceptance.cybersource.com/pay for production.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCheckout],
  },
}
