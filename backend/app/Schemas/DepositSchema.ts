import { DateTime } from 'luxon'

export interface DepositSchema {
  wallet_id: string
  type: 'deposit'
  amount: number
  when: DateTime
}
