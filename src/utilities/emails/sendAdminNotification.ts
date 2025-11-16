import type { PayloadRequest } from 'payload'
import { render } from '@react-email/render'

import { AdminNotification } from '@/emails/AdminNotification'
import { getCachedGlobal } from '../getGlobals'
import { Checkout } from '@/payload-types'

interface SendAdminNotificationParams {
  amount: number
  linkId: string
  reference: string
  customerName: string
  customerEmail: string
  customerPhone: string
  req: PayloadRequest
}

export const sendAdminNotification = async ({
  amount,
  linkId,
  reference,
  customerName,
  customerEmail,
  customerPhone,
  req,
}: SendAdminNotificationParams): Promise<void> => {
  const checkoutConfig = (await getCachedGlobal('checkout')()) as Checkout
  const emailConfig = await req.payload.findGlobal({ slug: 'email' })
  const adminEmail =
    emailConfig?.adminEmail || process.env.ADMIN_EMAIL || process.env.RESEND_FROM_ADDRESS || ''
  const signatureName = emailConfig?.signatureName || ''

  if (!adminEmail) {
    req.payload.logger.warn({
      msg: 'No admin email configured. Set adminEmail in Email global config or ADMIN_EMAIL environment variable.',
    })
    return
  }

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: checkoutConfig.currencyCode || 'USD',
  }).format(amount)

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const html = await render(
    AdminNotification({
      linkId,
      amount: formattedAmount,
      date: formattedDate,
      reference,
      customerName,
      customerEmail,
      customerPhone,
      signatureName,
    }),
  )

  const text =
    `Payment Received with Payment ID: ${linkId}, Amount: ${formattedAmount}, Date: ${formattedDate}. Customer Information: Name: ${customerName}, Email: ${customerEmail}, Phone: ${customerPhone}.`.trim()

  await req.payload.sendEmail({
    to: adminEmail,
    subject: `Payment Received - ${formattedAmount}`,
    html,
    text,
  })
}
