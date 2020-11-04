import { DateTime } from 'luxon'

export interface TransferSchema {
  type: 'transfer'
  bank: string
  ag: string
  cc: string
  person_name: string
  person_document: string
  amount: number
  when: DateTime
  description: string | null
}
