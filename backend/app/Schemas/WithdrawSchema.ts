import { DateTime } from 'luxon'

export interface WithdrawSchema {
  type: 'withdraw'
  amount: number
  when: DateTime
  description: string | null
}
