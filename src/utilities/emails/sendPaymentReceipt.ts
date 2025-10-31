import type { PayloadRequest } from 'payload'
import { render } from '@react-email/render'

import { PaymentReceipt } from '@/emails/PaymentReceipt'
import { getCachedGlobal } from '../getGlobals'
import { Checkout } from '@/payload-types'

interface SendPaymentReceiptParams {
  email: string
  customerName: string
  amount: number
  linkId: string
  req: PayloadRequest
}

export const sendPaymentReceipt = async ({
  email,
  customerName,
  amount,
  linkId,
  req,
}: SendPaymentReceiptParams): Promise<void> => {
  const checkoutConfig = (await getCachedGlobal('checkout')()) as Checkout
  const emailConfig = await req.payload.findGlobal({ slug: 'email' })
  const signatureName = emailConfig?.signatureName || ''

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: checkoutConfig.currencyCode || 'USD',
  }).format(amount)

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const html = await render(
    PaymentReceipt({
      customerName,
      linkId,
      amount: formattedAmount,
      date: formattedDate,
      signatureName,
    }),
  )

  const text =
    `Dear ${customerName}, thank you for your payment. Your Payment ID is ${linkId}, with an amount of ${formattedAmount} made on ${formattedDate}. The status of your payment is Completed.`.trim()

  await req.payload.sendEmail({
    to: email,
    subject: 'Payment Receipt',
    html,
    text,
  })
}
