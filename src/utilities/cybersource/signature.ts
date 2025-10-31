import crypto from 'crypto'

/**
 * Generate CyberSource Secure Acceptance signature for Secure Acceptance Hosted Checkout
 * @param params - Parameters to sign (access_key, profile_id, transaction_uuid, etc.)
 * @param secretKey - Secret key from CyberSource Secure Acceptance profile
 * @returns Base64 encoded HMAC SHA256 signature
 */
export function generateSignature(params: Record<string, string>, secretKey: string): string {
  // Get the list of field names to sign from signed_field_names parameter
  const signedFieldNames = params.signed_field_names || ''

  // If no signed_field_names, sign all fields except signature itself
  const fieldsToSign = signedFieldNames
    ? signedFieldNames.split(',')
    : Object.keys(params).filter((key) => key !== 'signature')

  // Build signed data string in the order specified by signed_field_names
  const signedData = fieldsToSign
    .sort() // Sort alphabetically
    .map((field) => `${field}=${params[field]}`)
    .join(',')

  // Create HMAC SHA256 hash with secret key
  const hmac = crypto.createHmac('sha256', secretKey)
  hmac.update(signedData)

  // Return base64 encoded signature
  return hmac.digest('base64')
}

/**
 * Verify CyberSource Secure Acceptance signature from response
 * @param params - Parameters from CyberSource response
 * @param secretKey - Secret key from CyberSource Secure Acceptance profile
 * @param signature - Signature received from CyberSource
 * @returns true if signature is valid, false otherwise
 */
export function verifySignature(
  params: Record<string, string>,
  secretKey: string,
  signature: string,
): boolean {
  const calculatedSignature = generateSignature(params, secretKey)
  return calculatedSignature === signature
}

/**
 * Generate CyberSource Secure Acceptance date time string
 * @returns date time string in the format of YYYY-MM-DDTHH:MM:SSZ
 */
export function dateTimeSring(): string {
  const date = new Date()
  const dateString = date.toISOString()
  return dateString.substring(0, 19) + 'Z'
}

/**
 * Get required signed parameters for CyberSource Secure Acceptance Hosted Checkout
 * @param paymentId - Unique payment link ID
 * @param amount - Transaction amount
 * @param currencyCode - Currency code (e.g., USD, LKR, EUR)
 * @param profileId - Profile ID
 * @param accessKey - Access key
 * @param secretKey - Secret key
 * @returns Parameters with generated signature
 */
export function getSignedParameters(
  paymentId: string,
  amount: number,
  currencyCode: string,
  profileId: string,
  accessKey: string,
  secretKey: string,
): Record<string, string> {
  const transactionUuid = crypto.randomUUID()
  const signedDateTime = dateTimeSring()

  // Required parameters for signing (alphabetical order)
  const params: Record<string, string> = {
    access_key: accessKey,
    amount: amount.toFixed(2),
    currency: currencyCode.toLowerCase(),
    locale: 'en-US',
    profile_id: profileId,
    reference_number: paymentId,
    signed_date_time: signedDateTime,
    signed_field_names: [
      'access_key',
      'profile_id',
      'transaction_uuid',
      'signed_field_names',
      'unsigned_field_names',
      'signed_date_time',
      'locale',
      'transaction_type',
      'reference_number',
      'amount',
      'currency',
      'override_custom_cancel_page',
      'override_custom_receipt_page',
    ].join(','),
    unsigned_field_names: [
      'signature',
      'bill_to_forename',
      'bill_to_surname',
      'bill_to_email',
      'bill_to_phone',
    ].join(','),
    transaction_type: 'sale',
    transaction_uuid: transactionUuid,
  }

  // Generate and add signature
  params.signature = generateSignature(params, secretKey)

  return params
}

/**
 * Map currency code to CyberSource supported format
 * @param currencyCode - Currency code from config
 * @returns CyberSource compatible currency code
 */
export function mapCurrencyCode(currencyCode: string): string {
  const currencyMap: Record<string, string> = {
    USD: 'USD',
    LKR: 'LKR',
    EUR: 'EUR',
    // Add more mappings as needed
  }

  return currencyMap[currencyCode] || currencyCode
}
