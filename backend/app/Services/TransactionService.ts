import { DateTime } from 'luxon'
import { DepositSchema } from 'App/Schemas/DepositSchema'
import { FilterSchema } from 'App/Schemas/FilterSchema'
import { PaymentSchema } from 'App/Schemas/PaymentSchema'
import { TransferSchema } from 'App/Schemas/TransferSchema'
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
   * Returns all transactions available for given user wallet.
   */
  public static async getWalletHistory (wallet: Wallet, filters: FilterSchema) : Promise<Transaction[]> {
    // Load and filter transactions
    await wallet.preload('transactions', (query) => {
      if (filters.type !== 'all') {
        query.where('type', filters.type)
      }
      query.preload('details')
      query.whereBetween('when', [filters.from.toString(), filters.to.toString()])
      query.orderBy('created_at', 'asc')
    })
    return wallet.transactions
  }

  /**
   * Create a payment transaction. If wallet has no balance, returns false.
   */
  public static async makePayment (data: PaymentSchema, wallet: Wallet) : Promise<Transaction | false> {
    if (!WalletService.hasBalance(wallet, data.amount)) {
      return false
    }

    // Save transaction
    const transaction = new Transaction()
    transaction.when = DateTime.local().toString()
    transaction.type = 'payment'
    transaction.amount = this._handleNegativeAmount(data.amount)
    await wallet.related('transactions').save(transaction)

    // Save document info
    const detail = new Detail()
    detail.barcode = data.barcode
    detail.description = data.description
    await detail.related('transaction').associate(transaction)

    // Calculates balance
    await WalletService.makeBalance(wallet)
    return transaction
  }

  /**
   * Create a deposit transaction. If some problem occurs adding credit to wallet
   * then false is returned.
   */
  public static async makeDeposit (data: DepositSchema, wallet: Wallet) : Promise<Transaction | false> {
    // Save transaction
    const transaction = new Transaction()
    transaction.when = DateTime.local().toString()
    transaction.type = 'deposit'
    transaction.amount = Math.abs(data.amount)
    await wallet.related('transactions').save(transaction)

    // Save details info
    const detail = new Detail()
    detail.description = data.description
    await detail.related('transaction').associate(transaction)

    // Calculates balance
    await WalletService.makeBalance(wallet)
    return transaction
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
    if (!WalletService.hasBalance(wallet, data.amount)) {
      return false
    }

    // Save transaction
    const transaction = new Transaction()
    transaction.when = DateTime.local().toString()
    transaction.type = 'transfer'
    transaction.amount = this._handleNegativeAmount(data.amount)
    await wallet.related('transactions').save(transaction)

    // Save transfer info
    const detail = new Detail()
    detail.bank = data.bank
    detail.ag = data.ag
    detail.cc = data.cc
    detail.personName = data.person_name
    detail.personDocument = data.person_document
    detail.description = data.description
    await detail.related('transaction').associate(transaction)

    // Calculates balance
    await WalletService.makeBalance(wallet)
    return transaction
  }

  /**
   * Create a withdraw transaction to given wallet.
   */
  public static async makeWithdraw (data: WithdrawSchema, wallet: Wallet) : Promise<Transaction | false> {
    if (!WalletService.hasBalance(wallet, data.amount)) {
      return false
    }

    // Save transaction
    const transaction = new Transaction()
    transaction.when = DateTime.local().toString()
    transaction.type = 'withdraw'
    transaction.amount = this._handleNegativeAmount(data.amount)
    await wallet.related('transactions').save(transaction)

    // Save transfer info
    const detail = new Detail()
    detail.description = data.description
    await detail.related('transaction').associate(transaction)

    // Calculates balance
    await WalletService.makeBalance(wallet)
    return transaction
  }
}
