import { DateTime } from 'luxon'

export interface WithdrawSchema {
  wallet_id: string
  type: 'withdraw'
  amount: number
  when: DateTime
}
