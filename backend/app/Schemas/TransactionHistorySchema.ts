import Transaction from 'App/Models/Transaction'

export interface TransactionHistorySchema {
  total: number,
  transactions: Transaction[]
}
