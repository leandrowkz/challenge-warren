export interface TransferSchema {
  bank: string
  ag: string
  cc: string
  person_name: string
  person_document: string
  amount: number
  description: string | null
}
