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
} from '@react-email/components'
import * as React from 'react'

interface PaymentReceiptProps {
  customerName: string
  linkId: string
  amount: string
  date: string
  signatureName: string
}

export const PaymentReceipt = ({
  customerName,
  linkId,
  amount,
  date,
  signatureName,
}: PaymentReceiptProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your payment receipt from {signatureName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Payment Receipt</Heading>

          <Text style={text}>Dear {customerName},</Text>

          <Text style={text}>
            Thank you for your payment. This email confirms that your payment has been successfully
            processed.
          </Text>

          <Section style={section}>
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
                <Text style={value}>{amount}</Text>
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
            <Row style={tableRow}>
              <Column style={tableCellLabel}>
                <Text style={label}>Status:</Text>
              </Column>
              <Column style={tableCellValue}>
                <Text style={statusCompleted}>Completed</Text>
              </Column>
            </Row>
          </Section>

          <Text style={text}>Please keep this receipt for your records.</Text>

          <Text style={footer}>
            Best regards,
            <br />
            {signatureName}
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

const section = {
  backgroundColor: '#f8f9fa',
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

const statusCompleted = {
  color: '#28a745',
  fontSize: '16px',
  margin: 0,
}

const footer = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '20px 0 0',
}

PaymentReceipt.PreviewProps = {
  customerName: 'John Doe',
  linkId: '123e4567-e89b-12d3-a456-426614174000',
  amount: '$1,250.00',
  date: 'January 15, 2025',
  signatureName: 'Company Corp.',
} as PaymentReceiptProps

export default PaymentReceipt
