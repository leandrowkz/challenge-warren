import { DateTime } from 'luxon'

export interface PaymentSchema {
  userId: string
  type: 'payment'
  amount: number
  when: DateTime
}
