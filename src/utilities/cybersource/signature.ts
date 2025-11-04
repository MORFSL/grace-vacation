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

  // If no signed_field_names, sign all fields except signature itself and sensitive card data
  const fieldsToSign = signedFieldNames
    ? signedFieldNames.split(',')
    : Object.keys(params).filter(
        (key) => key !== 'signature' && key !== 'card_number' && key !== 'card_cvn',
      )

  // CRITICAL: Build signed data string in the EXACT order specified by signed_field_names
  // DO NOT sort - CyberSource requires the sequence to match signed_field_names exactly
  const signedData = fieldsToSign
    .map((field) => {
      const value = params[field]
      if (value === undefined || value === null) {
        throw new Error(`Missing required field for signature: ${field}`)
      }
      return `${field}=${value}`
    })
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
export function dateTimeString(): string {
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
 * @param options - Optional parameters including callback URLs and customer info
 * @returns Parameters with generated signature
 */
export function getSignedParameters(
  paymentId: string,
  amount: number,
  currencyCode: string,
  profileId: string,
  accessKey: string,
  secretKey: string,
  options?: {
    receiptPageUrl?: string
    cancelPageUrl?: string
    billToForename?: string
    billToSurname?: string
    billToEmail?: string
    billToPhone?: string
    billToAddressLine1?: string
    billToAddressCity?: string
    billToAddressCountry?: string
  },
): Record<string, string> {
  const transactionUuid = crypto.randomUUID()
  const signedDateTime = dateTimeString()

  // Define signed_field_names in the EXACT order they will appear in the signature
  // CRITICAL: This order must match the order used when building the signature string
  const signedFieldNames: string[] = [
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
  ]

  // Add override pages to signed_field_names if provided (they must be signed)
  if (options?.receiptPageUrl) {
    signedFieldNames.push('override_custom_receipt_page')
  }
  if (options?.cancelPageUrl) {
    signedFieldNames.push('override_custom_cancel_page')
  }

  // Build parameters object in the order specified by signed_field_names
  const params: Record<string, string> = {
    access_key: accessKey,
    profile_id: profileId,
    transaction_uuid: transactionUuid,
    signed_field_names: signedFieldNames.join(','),
    unsigned_field_names: [
      'signature',
      'bill_to_forename',
      'bill_to_surname',
      'bill_to_email',
      'bill_to_phone',
      'bill_to_address_line1',
      'bill_to_address_city',
      'bill_to_address_country',
    ].join(','),
    signed_date_time: signedDateTime,
    locale: 'en-US',
    transaction_type: 'sale',
    reference_number: paymentId,
    amount: amount.toFixed(2),
    currency: currencyCode.toLowerCase(),
  }

  // Add override pages BEFORE generating signature (they're in signed_field_names)
  if (options?.receiptPageUrl) {
    params.override_custom_receipt_page = options.receiptPageUrl
  }
  if (options?.cancelPageUrl) {
    params.override_custom_cancel_page = options.cancelPageUrl
  }

  // Generate and add signature
  // Signature is calculated on fields in signed_field_names in the exact order specified
  params.signature = generateSignature(params, secretKey)

  // Add unsigned fields AFTER signature generation (these are not included in signature)
  if (options?.billToForename) {
    params.bill_to_forename = options.billToForename
  }
  if (options?.billToSurname) {
    params.bill_to_surname = options.billToSurname
  }
  if (options?.billToEmail) {
    params.bill_to_email = options.billToEmail
  }
  if (options?.billToPhone) {
    params.bill_to_phone = options.billToPhone
  }
  if (options?.billToAddressLine1) {
    params.bill_to_address_line1 = options.billToAddressLine1
  }
  if (options?.billToAddressCity) {
    params.bill_to_address_city = options.billToAddressCity
  }
  if (options?.billToAddressCountry) {
    params.bill_to_address_country = options.billToAddressCountry
  }

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
