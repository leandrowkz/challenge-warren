import { DateTime } from 'luxon'

export interface DepositSchema {
  account_id: string
  type: 'deposit'
  amount: number
  when: DateTime
}
