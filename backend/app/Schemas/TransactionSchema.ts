export interface TransactionSchema {
  id?: string
  user_id: string
  type: 'deposit' | 'withdraw' | 'payment'
  when: string
  amount: number
  description: string
}
