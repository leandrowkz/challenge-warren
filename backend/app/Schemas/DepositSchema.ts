import { DateTime } from 'luxon'

export interface DepositSchema {
  type: 'deposit'
  amount: number
  when: DateTime
  description: string | null
}
