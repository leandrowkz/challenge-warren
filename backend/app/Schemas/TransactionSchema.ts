export interface TransactionSchema {
  id?: string
  wallet_id: string
  type: 'deposit' | 'withdraw' | 'payment' | 'transfer'
  when: string
  amount: number
  description: string
}
