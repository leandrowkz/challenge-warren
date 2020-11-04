import { DateTime } from 'luxon'

export interface PaymentSchema {
  wallet_id: string
  type: 'payment'
  barcode: string
  amount: number
  when: DateTime
}
