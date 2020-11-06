import { DateTime } from 'luxon'

export interface FilterSchema {
  type: 'all' | 'deposit' | 'withdraw' | 'payment' | 'transfer'
  from: DateTime
  to: DateTime
}
