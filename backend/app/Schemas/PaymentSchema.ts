import { DateTime } from 'luxon'

export interface PaymentSchema {
  account_id: string
  type: 'payment'
  barcode: string
  amount: number
  when: DateTime
}
