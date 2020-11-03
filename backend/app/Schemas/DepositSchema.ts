import { DateTime } from 'luxon'

export interface DepositSchema {
  user_id: string
  type: 'deposit'
  amount: number
  when: DateTime
}
