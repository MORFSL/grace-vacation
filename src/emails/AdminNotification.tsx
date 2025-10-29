import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Link,
} from '@react-email/components'
import * as React from 'react'

interface AdminNotificationProps {
  linkId: string
  amount: string
  date: string
  customerName: string
  customerEmail: string
  customerPhone: string
  signatureName: string
}

export const AdminNotification = ({
  linkId,
  amount,
  date,
  customerName,
  customerEmail,
  customerPhone,
  signatureName,
}: AdminNotificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>New payment received - {amount}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Payment Received</Heading>

          <Text style={text}>A new payment has been successfully processed.</Text>

          <Section style={paymentSection}>
            <Row style={tableRow}>
              <Column style={tableCellLabel}>
                <Text style={label}>Payment ID:</Text>
              </Column>
              <Column style={tableCellValue}>
                <Text style={value}>{linkId}</Text>
              </Column>
            </Row>
            <Row style={tableRow}>
              <Column style={tableCellLabel}>
                <Text style={label}>Amount:</Text>
              </Column>
              <Column style={tableCellValue}>
                <Text style={amountValue}>{amount}</Text>
              </Column>
            </Row>
            <Row style={tableRow}>
              <Column style={tableCellLabel}>
                <Text style={label}>Date:</Text>
              </Column>
              <Column style={tableCellValue}>
                <Text style={value}>{date}</Text>
              </Column>
            </Row>
          </Section>

          <Section style={customerSection}>
            <Row style={tableRow}>
              <Column style={tableCellLabel}>
                <Text style={label}>Name:</Text>
              </Column>
              <Column style={tableCellValue}>
                <Text style={value}>{customerName}</Text>
              </Column>
            </Row>
            <Row style={tableRow}>
              <Column style={tableCellLabel}>
                <Text style={label}>Email:</Text>
              </Column>
              <Column style={tableCellValue}>
                <Link href={`mailto:${customerEmail}`} style={link}>
                  {customerEmail}
                </Link>
              </Column>
            </Row>
            <Row style={tableRow}>
              <Column style={tableCellLabel}>
                <Text style={label}>Phone:</Text>
              </Column>
              <Column style={tableCellValue}>
                <Text style={value}>{customerPhone}</Text>
              </Column>
            </Row>
          </Section>

          <Text style={footer}>
            This is an automated notification from the {signatureName} payment system.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
}

const h1 = {
  color: '#2c3e50',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 20px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const paymentSection = {
  backgroundColor: '#f8f9fa',
  borderRadius: '5px',
  padding: '20px',
  margin: '20px 0',
}

const customerSection = {
  backgroundColor: '#e7f3ff',
  borderRadius: '5px',
  padding: '20px',
  margin: '20px 0',
}

const tableRow = {
  margin: '8px 0',
}

const tableCellLabel = {
  width: '40%',
}

const tableCellValue = {
  width: '60%',
}

const label = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: 0,
}

const value = {
  color: '#333',
  fontSize: '16px',
  margin: 0,
}

const amountValue = {
  color: '#28a745',
  fontSize: '19px',
  fontWeight: 'bold',
  margin: 0,
}

const link = {
  color: '#2563eb',
  fontSize: '16px',
  textDecoration: 'underline',
}

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '30px 0 0',
}

AdminNotification.PreviewProps = {
  linkId: '123e4567-e89b-12d3-a456-426614174000',
  amount: '$1,250.00',
  date: 'January 15, 2025, 10:30 AM',
  customerName: 'John Doe',
  customerEmail: 'john.doe@example.com',
  customerPhone: '+1 (555) 123-4567',
  signatureName: 'Company Corp.',
} as AdminNotificationProps

export default AdminNotification
