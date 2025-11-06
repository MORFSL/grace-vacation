import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

interface PaymentStats {
  total: number
  pending: number
  completed: number
  cancelled: number
  failed: number
}

interface Payment {
  amount: number
  status: 'pending' | 'completed' | 'cancelled' | 'failed'
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const PaymentsDashboard: React.FC = async () => {
  const payload = await getPayload({ config })

  // Fetch all payments from the database
  const { docs: payments } = await payload.find({
    collection: 'payments',
    limit: 1000,
  })

  // Calculate stats
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
        case 'cancelled':
          acc.cancelled += amount
          break
        case 'failed':
          acc.failed += amount
          break
      }

      return acc
    },
    { total: 0, pending: 0, completed: 0, cancelled: 0, failed: 0 }
  )

  return (
    <div
      style={{
        backgroundColor: 'var(--theme-elevation-50)',
        borderRadius: 'var(--base-border-radius)',
        padding: 'var(--gutter-h)',
        marginBottom: 'var(--base)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--base)',
        }}
      >
        <h3 style={{ margin: 0, fontSize: 'var(--font-size-large)' }}>Payments</h3>
        <Link
          href="/admin/collections/payments"
          style={{
            color: 'var(--theme-text)',
            textDecoration: 'none',
            fontSize: 'var(--font-size-sm)',
            opacity: 0.8,
          }}
        >
          View All →
        </Link>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--base)',
        }}
      >
        <div>
          <p style={{ color: 'var(--theme-text)', marginBottom: '0.5rem' }}>
            <strong>Total Payments:</strong>
          </p>
          <p style={{ fontSize: 'var(--font-size-xl)', margin: 0 }}>
            {formatCurrency(stats.total)}
          </p>
        </div>
        <div>
          <p style={{ color: 'var(--theme-text)', marginBottom: '0.5rem' }}>
            <strong>Pending:</strong>
          </p>
          <p style={{ fontSize: 'var(--font-size-xl)', margin: 0, color: '#fbbf24' }}>
            {formatCurrency(stats.pending)}
          </p>
        </div>
        <div>
          <p style={{ color: 'var(--theme-text)', marginBottom: '0.5rem' }}>
            <strong>Completed:</strong>
          </p>
          <p style={{ fontSize: 'var(--font-size-xl)', margin: 0, color: '#10b981' }}>
            {formatCurrency(stats.completed)}
          </p>
        </div>
        <div>
          <p style={{ color: 'var(--theme-text)', marginBottom: '0.5rem' }}>
            <strong>Cancelled:</strong>
          </p>
          <p style={{ fontSize: 'var(--font-size-xl)', margin: 0, color: '#ef4444' }}>
            {formatCurrency(stats.cancelled)}
          </p>
        </div>
      </div>
    </div>
  )
}
