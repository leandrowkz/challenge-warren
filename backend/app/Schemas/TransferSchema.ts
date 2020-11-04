import { DateTime } from 'luxon'

export interface TransferSchema {
  wallet_id: string
  type: 'transfer'
  bank: string
  ag: string
  cc: string
  person_name: string
  person_document: string
  amount: number
  when: DateTime
}
