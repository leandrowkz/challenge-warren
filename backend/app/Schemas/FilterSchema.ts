import { DateTime } from 'luxon'

export interface FilterSchema {
  type: null | 'deposit' | 'withdraw' | 'payment'
  from: DateTime
  to: DateTime
}
