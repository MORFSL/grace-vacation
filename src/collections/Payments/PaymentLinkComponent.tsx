'use client'

import React, { useCallback, useState } from 'react'
import { TextFieldClientProps } from 'payload'
import { useFormFields } from '@payloadcms/ui'
import { Button, TextInput, FieldLabel } from '@payloadcms/ui'

type PaymentLinkComponentProps = TextFieldClientProps

export const PaymentLinkComponent: React.FC<PaymentLinkComponentProps> = ({ field, path }) => {
  const { label } = field

  // Get linkId from the form (sibling field)
  const linkId = useFormFields(([fields]) => {
    return fields?.linkId?.value as string
  })

  const [copied, setCopied] = useState(false)

  const baseUrl =
    typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.host}`
      : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  const paymentLink = linkId ? `${baseUrl}/checkout/${linkId}` : ''

  const handleCopy = useCallback(async () => {
    if (!paymentLink) return

    try {
      await navigator.clipboard.writeText(paymentLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [paymentLink])

  return (
    <div className="field-type payment-link-component">
      <div
        className="label-wrapper"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FieldLabel htmlFor={`field-${path}`} label={label || 'Payment Link'} />
        {paymentLink && (
          <Button buttonStyle="pill" onClick={handleCopy} size="small">
            {copied ? 'Link Copied!' : 'Copy Payment Link'}
          </Button>
        )}
      </div>

      <TextInput
        value={paymentLink || ''}
        onChange={() => {}}
        path={`${path || field.name}_display`}
        readOnly={true}
      />
    </div>
  )
}
