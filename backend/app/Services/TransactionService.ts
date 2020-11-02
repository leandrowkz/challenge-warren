import { DateTime } from 'luxon'
import { DepositSchema } from 'App/Schemas/DepositSchema'
import { FilterSchema } from 'App/Schemas/FilterSchema'
import { PaymentSchema } from 'App/Schemas/PaymentSchema'
import Transaction from 'App/Models/Transaction'
import User from 'App/Models/User'

export default class TransactionService {
  /**
   * Returns all transactions available for given user.
   */
  public static async getUserHistory (user: User, filters: FilterSchema) : Promise<Transaction[]> {
    // Load and filter transactions
    await user.preload('transactions', (query) => {
      if (filters.type) {
        query.where('type', filters.type)
      }
      query.whereBetween('when', [filters.from.toString(), filters.to.toString()])
      query.orderBy('created_at', 'asc')
    })
    return user.transactions
  }

  /**
   * Create a payment transaction.
   */
  public static async makePayment (data: PaymentSchema) : Promise<Transaction> {
    const transaction = new Transaction()
    // @ts-ignore
    transaction.when = DateTime.now().toString()
    transaction.type = 'payment'
    transaction.amount = data.amount
    transaction.userId = data.userId
    await transaction.save()
    return transaction
  }

  /**
   * Create a deposit transaction.
   */
  public static async makeDeposit (data: DepositSchema) : Promise<Transaction> {
    const transaction = new Transaction()
    // @ts-ignore
    transaction.when = DateTime.now().toString()
    transaction.type = 'payment'
    transaction.amount = data.amount
    transaction.userId = data.userId
    await transaction.save()
    return transaction
  }
}
