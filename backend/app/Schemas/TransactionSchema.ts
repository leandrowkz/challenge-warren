export interface TransactionSchema {
  id?: string
  account_id: string
  type: 'deposit' | 'withdraw' | 'payment'
  when: string
  amount: number
  description: string
}
