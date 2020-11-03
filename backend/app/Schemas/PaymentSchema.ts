import { DateTime } from 'luxon'

export interface PaymentSchema {
  user_id: string
  type: 'payment'
  barcode: string
  amount: number
  when: DateTime
}
