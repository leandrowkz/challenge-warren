import { DateTime } from 'luxon'
import { DepositSchema } from 'App/Schemas/DepositSchema'
import { FilterSchema } from 'App/Schemas/FilterSchema'
import { PaymentSchema } from 'App/Schemas/PaymentSchema'
import { TransferSchema } from 'App/Schemas/TransferSchema'
import { TransactionHistorySchema } from 'App/Schemas/TransactionHistorySchema'
import { WithdrawSchema } from 'App/Schemas/WithdrawSchema'
import Wallet from 'App/Models/Wallet'
import Detail from 'App/Models/Detail'
import Transaction from 'App/Models/Transaction'
import WalletService from 'App/Services/WalletService'

export default class TransactionService {
  /**
   * Handle given amount.
   * Prevent to insert positive values where it is supposed to insert positive ones.
   */
  protected static _handleNegativeAmount (amount: number): number {
    return -(amount) > 0 ? amount : -(amount)
  }

  /**
   * Make a new operation on given wallet (Saves a new transaction according with given params).
   */
  protected static async _makeOperation (
    wallet: Wallet,
    type: 'transfer' | 'payment' | 'withdraw' | 'deposit' | 'monetize',
    amount: number,
    details: any = {}
  ) : Promise<Transaction | false> {
    // Operation is credit or debit?
    const isDebit = ['transfer', 'payment', 'withdraw'].includes(type)

    // Wallet has no balance for this operation
    if (isDebit && !WalletService.hasBalance(wallet, amount)) {
      return false
    }

    // Save transaction
    const transaction = new Transaction()
    transaction.when = DateTime.local().toString()
    transaction.type = type
    transaction.amount = isDebit ? this._handleNegativeAmount(amount) : Math.abs(amount)
    await wallet.related('transactions').save(transaction)

    // Save details info
    const attrs = Object.keys(details)
    const detail = new Detail()
    attrs.forEach((attr) => {
      detail[attr] = details[attr]
    })
    await detail.related('transaction').associate(transaction)

    // Calculates balance
    await WalletService.makeBalance(wallet)
    return transaction
  }

  /**
   * Returns all transactions available for given user wallet.
   */
  public static async getWalletHistory (wallet: Wallet, filters: FilterSchema) : Promise<TransactionHistorySchema> {
    // Load and filter transactions
    await wallet.preload('transactions', (query) => {
      if (filters.type !== 'all') {
        query.where('type', filters.type)
      }
      const from = `${filters.from} 00:00:00`
      const to = `${filters.to} 23:59:59`
      query.whereBetween('when', [from, to])
      query.orderBy('created_at', 'asc')
      query.preload('details')
    })

    // Calculate total amount
    const { transactions } = wallet
    const total = Number(transactions.reduce((prev, item) => prev + item.amount, 0).toFixed(2))

    return {
      total,
      transactions,
    }
  }

  /**
   * Create a payment transaction. If wallet has no balance, returns false.
   */
  public static async makePayment (data: PaymentSchema, wallet: Wallet) : Promise<Transaction | false> {
    const details = {
      barcode: data.barcode,
      description: data.description,
    }
    return await this._makeOperation(wallet, 'payment', data.amount, details)
  }

  /**
   * Create a deposit transaction. If some problem occurs adding credit to wallet
   * then false is returned.
   */
  public static async makeDeposit (data: DepositSchema, wallet: Wallet) : Promise<Transaction | false> {
    const details = {
      description: data.description,
    }
    return await this._makeOperation(wallet, 'deposit', data.amount, details)
  }

  /**
   * Create a transfer transaction to given wallet.
   *
   * @TODO
   * Mark transaction as 'pending' and process transfer confirmation
   * in a queue/listener system. Once is confirmed then confirm this
   * transaction and debit value properly. If not, mark as error and
   * rollback value to wallet balance.
   */
  public static async makeTransfer (data: TransferSchema, wallet: Wallet) : Promise<Transaction | false> {
    const details = {
      bank: data.bank,
      ag: data.ag,
      cc: data.cc,
      personName: data.person_name,
      personDocument: data.person_document,
      description: data.description,
    }
    return await this._makeOperation(wallet, 'transfer', data.amount, details)
  }

  /**
   * Create a withdraw transaction to given wallet.
   */
  public static async makeWithdraw (data: WithdrawSchema, wallet: Wallet) : Promise<Transaction | false> {
    const details = {
      description: data.description,
    }
    return await this._makeOperation(wallet, 'withdraw', data.amount, details)
  }
}
