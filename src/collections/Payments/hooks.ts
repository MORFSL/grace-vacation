import type { CollectionBeforeChangeHook, CollectionAfterChangeHook } from 'payload'
import { randomUUID } from 'crypto'

import { sendPaymentReceipt } from '../../utilities/emails/sendPaymentReceipt'
import { sendAdminNotification } from '../../utilities/emails/sendAdminNotification'

export const generatePaymentId: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create') {
    // On create, only allow amount to be set by admin
    // All other fields are auto-generated or populated later
    return {
      amount: data.amount,
      reference: data.reference || null,
      linkId: randomUUID(),
      status: 'pending',
      customerName: null,
      customerEmail: null,
      customerPhone: null,
      response: null,
      paidAt: null,
    }
  }

  return data
}

export const restrictFieldsOnCreate: CollectionBeforeChangeHook = ({ data, operation }) => {
  // Ensure that on create, admin can only set the amount
  // This is a safety measure in case admin tries to submit other fields
  if (operation === 'create') {
    const restricted = {
      amount: data.amount,
      reference: data.reference || null,
    }

    // The generatePaymentId hook will add linkId and status
    // But we ensure nothing else is set
    return restricted
  }

  return data
}

export const protectReadOnlyFields: CollectionBeforeChangeHook = ({
  data,
  operation,
  originalDoc,
}) => {
  // On update, protect read-only fields from being modified
  // The response field should only be set via API (checkout process), not by admin UI
  if (operation === 'update' && originalDoc) {
    return {
      ...data,
      // Always preserve linkId - it should never change
      linkId: originalDoc.linkId,
      // Preserve response if it already exists (prevent admin from editing it)
      // Only allow setting it if it was previously null (first time via API)
      response: originalDoc.response || data.response,
    }
  }

  return data
}

export const handlePaymentCompletion: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  // Only process if status changed to 'completed'
  if (doc.status === 'completed' && previousDoc?.status !== 'completed') {
    if (doc.customerEmail) {
      try {
        await sendPaymentReceipt({
          email: doc.customerEmail,
          customerName: doc.customerName || 'Customer',
          amount: doc.amount,
          linkId: doc.linkId,
          req,
        })
      } catch (error) {
        req.payload.logger.error({
          err: error,
          msg: 'Failed to send payment receipt email',
        })
      }
    }

    try {
      await sendAdminNotification({
        amount: doc.amount,
        linkId: doc.linkId,
        customerName: doc.customerName || 'N/A',
        customerEmail: doc.customerEmail || 'N/A',
        customerPhone: doc.customerPhone || 'N/A',
        reference: doc.reference || 'N/A',
        req,
      })
    } catch (error) {
      req.payload.logger.error({
        err: error,
        msg: 'Failed to send admin notification email',
      })
    }
  }
}
