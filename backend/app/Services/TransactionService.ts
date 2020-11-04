import { DateTime } from 'luxon'
import { DepositSchema } from 'App/Schemas/DepositSchema'
import { FilterSchema } from 'App/Schemas/FilterSchema'
import { PaymentSchema } from 'App/Schemas/PaymentSchema'
import Wallet from 'App/Models/Wallet'
import Detail from 'App/Models/Detail'
import Transaction from 'App/Models/Transaction'

export default class TransactionService {
  /**
   * Handle given amount.
   * Prevent to insert positive values where it is supposed to insert positive ones.
   */
  protected static _handleNegativeAmount (amount: number): number {
    return -(amount) > 0 ? amount : -(amount)
  }

  /**
   * Returns all transactions available for given user wallet.
   */
  public static async getWalletHistory (wallet: Wallet, filters: FilterSchema) : Promise<Transaction[]> {
    // Load and filter transactions
    await wallet.preload('transactions', (query) => {
      if (filters.type) {
        query.where('type', filters.type)
      }
      query.whereBetween('when', [filters.from.toString(), filters.to.toString()])
      query.orderBy('created_at', 'asc')
    })
    return wallet.transactions
  }

  /**
   * Create a payment transaction.
   */
  public static async makePayment (data: PaymentSchema) : Promise<Transaction> {
    const transaction = new Transaction()
    transaction.when = DateTime.local().toString()
    transaction.type = 'payment'
    transaction.amount = this._handleNegativeAmount(data.amount)
    transaction.walletId = data.wallet_id
    await transaction.save()

    // Save document info
    const detail = new Detail()
    detail.barcode = data.barcode
    await detail.related('transaction').associate(transaction)
    return transaction
  }

  /**
   * Create a deposit transaction.
   */
  public static async makeDeposit (data: DepositSchema) : Promise<Transaction> {
    const transaction = new Transaction()
    transaction.when = DateTime.local().toString()
    transaction.type = 'deposit'
    transaction.amount = data.amount
    transaction.walletId = data.wallet_id
    await transaction.save()
    return transaction
  }
}
