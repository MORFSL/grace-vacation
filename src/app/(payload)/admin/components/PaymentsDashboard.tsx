import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Checkout } from '@/payload-types'

interface PaymentStats {
  total: number
  pending: number
  completed: number
  failed: number
}

interface Payment {
  amount: number
  status: 'pending' | 'completed' | 'failed'
}

const formatCurrency = async (amount: number) => {
  const checkoutConfig = (await getCachedGlobal('checkout')()) as Checkout
  const currencyCode = checkoutConfig.currencyCode || 'USD'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount)
}

export const PaymentsDashboard: React.FC = async () => {
  const payload = await getPayload({ config })

  const { docs: payments } = await payload.find({
    collection: 'payments',
    limit: 1000,
  })

  const stats = (payments as Payment[]).reduce(
    (acc: PaymentStats, payment: Payment) => {
      const amount = payment.amount || 0
      acc.total += amount

      switch (payment.status) {
        case 'pending':
          acc.pending += amount
          break
        case 'completed':
          acc.completed += amount
          break
        case 'failed':
          acc.failed += amount
          break
      }

      return acc
    },
    { total: 0, pending: 0, completed: 0, failed: 0 },
  )

  return (
    <div
      style={{
        marginBottom: 'var(--base)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--base)',
        }}
      >
        <div
          className="card"
          style={{
            flexDirection: 'column',
          }}
        >
          <p style={{ color: 'var(--theme-text)', marginBottom: '0.5rem' }}>
            <strong>Revenue</strong>
          </p>
          <p style={{ margin: 0 }}>
            <span style={{ fontSize: '24px', fontWeight: 600 }}>{formatCurrency(stats.total)}</span>
          </p>
        </div>
        <div
          className="card"
          style={{
            flexDirection: 'column',
          }}
        >
          <p style={{ color: 'var(--theme-text)', marginBottom: '0.5rem' }}>
            <strong>Payments Due</strong>
          </p>
          <p style={{ fontSize: 'var(--font-size-xl)', margin: 0, color: '#fbbf24' }}>
            <span style={{ fontSize: '24px', fontWeight: 600 }}>
              {formatCurrency(stats.pending)}
            </span>
          </p>
        </div>
        <div
          className="card"
          style={{
            flexDirection: 'column',
          }}
        >
          <p style={{ color: 'var(--theme-text)', marginBottom: '0.5rem' }}>
            <strong>Payments Collected</strong>
          </p>
          <p style={{ fontSize: 'var(--font-size-xl)', margin: 0, color: '#10b981' }}>
            <span style={{ fontSize: '24px', fontWeight: 600 }}>
              {formatCurrency(stats.completed)}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
