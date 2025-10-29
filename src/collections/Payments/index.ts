import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import {
  generatePaymentId,
  handlePaymentCompletion,
  restrictFieldsOnCreate,
  protectReadOnlyFields,
} from './hooks'

export const Payments: CollectionConfig = {
  slug: 'payments',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['linkId', 'amount', 'status', 'customerEmail', 'paidAt'],
    useAsTitle: 'linkId',
  },
  fields: [
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description: 'Predefined payment amount set by admin',
      },
    },
    {
      name: 'linkId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        description: 'Unique UUID identifier for the payment link (auto-generated)',
        hidden: true,
      },
    },
    {
      name: 'paymentLink',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Payment link URL - Copy Link URL',
        position: 'sidebar',
        components: {
          Field: '@/collections/Payments/PaymentLinkComponent#PaymentLinkComponent',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Payment status (auto-managed)',
      },
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'Failed',
          value: 'failed',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
      ],
    },
    {
      name: 'paidAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Date when payment was successfully completed',
        position: 'sidebar',
      },
    },
    {
      name: 'customerName',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Customer name from checkout',
      },
    },
    {
      name: 'customerEmail',
      type: 'email',
      admin: {
        readOnly: true,
        description: 'Customer email for receipt (populated during checkout)',
      },
    },
    {
      name: 'customerPhone',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Customer phone number (populated during checkout)',
      },
    },
    {
      name: 'response',
      type: 'json',
      admin: {
        readOnly: true,
        description: 'Payment gateway response stored as JSON (auto-populated)',
      },
    },
  ],
  hooks: {
    beforeChange: [restrictFieldsOnCreate, generatePaymentId, protectReadOnlyFields],
    afterChange: [handlePaymentCompletion],
  },
  timestamps: true,
}
