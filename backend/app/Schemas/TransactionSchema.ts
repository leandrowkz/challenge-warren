export interface TransactionSchema {
  id?: string
  wallet_id: string
  type: 'deposit' | 'withdraw' | 'payment'
  when: string
  amount: number
  description: string
}
