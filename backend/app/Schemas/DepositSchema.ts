import { DateTime } from 'luxon'

export interface DepositSchema {
  userId: string
  type: 'deposit'
  amount: number
  when: DateTime
}
