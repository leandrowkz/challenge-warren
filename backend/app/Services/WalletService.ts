import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Wallet from 'App/Models/Wallet'
import { MonetizeSchema } from 'App/Schemas/MonetizeSchema'
import TransactionService from 'App/Services/TransactionService'

export default class WalletService {
  public static DAILY_INTEREST_RATE = 0.17

  /**
   * Make a random CC number.
   */
  public static makeCC (): string {
    const prefix = Math.floor(Math.random() * 100000).toString()
    const digit = Math.floor(Math.random() * 10).toString()
    return `${prefix}-${digit}`
  }

  /**
   * Make a wallet to given user. If user already has, return it.
   */
  public static async makeUserWallet (user: User): Promise<Wallet | false> {
    if (!user) {
      return false
    }

    // User already has an wallet
    let wallet = await this.getUserWallet(user)
    if (wallet) {
      return wallet
    }

    // Build a new wallet
    const ag = '000001'
    const cc = this.makeCC()
    wallet = await Wallet.query().where('ag', ag).where('cc', cc).first() as Wallet

    // No wallet exists with those values, create a new one to user
    if (!wallet) {
      wallet = new Wallet()
      wallet.ag = ag
      wallet.cc = cc
      wallet.balance = 0
      await wallet.related('user').associate(user)
      return wallet
    } else {
      // An wallet already exists with this code, attempt to create a new one
      return await this.makeUserWallet(user)
    }
  }

  /**
   * Returns user wallet or false if user does not has onde.
   */
  public static async getUserWallet (user: User) : Promise<Wallet | false> {
    if (!user) {
      return false
    }
    await user.preload('wallet')
    return user.wallet || false
  }

  /**
   * Check if given wallet has balance to make a transaction that reduces value.
   */
  public static hasBalance (wallet: Wallet, amount: number): boolean {
    return wallet.balance - amount >= 0
  }

  /**
   * Rebuilds wallet balance according with wallet transactions.
   */
  public static async makeBalance (wallet: Wallet) : Promise<boolean> {
    const [total] = await Database
      .query()
      .where('wallet_id', wallet.id)
      .sum('amount as sum')
      .from('transactions')

    wallet.balance = Number(total.sum.toFixed(2))

    await wallet.save()
    return true
  }

  /**
   * Monetize balance from given wallet.
   * 1) Check if balance was already monetized today - if so, skip.
   * 2) Monetize current balance according with DAILY_INTEREST_RATE.
   * 3) Saves new 'monetize' transaction with result value.
   * 4) Saves info that balance was monetized today - this way we can
   *    run any times we want this method and it will not duplicate
   *    daily monetization.
   *
   * @todo
   * [ ] Makes DAILY_INTEREST_RATE comes from an external service.
   */
  public static async monetizeBalance (wallet: Wallet) : Promise<boolean> {
    await wallet.preload('transactions', (query) => {
      const from = DateTime.local().startOf('day').toUTC().toISO()
      const to = DateTime.local().endOf('day').toUTC().toISO()
      query.where('type', 'monetize')
      query.whereBetween('when', [from, to])
    })

    // Has not been monetized yet
    if (wallet.transactions.length <= 0) {
      const rate = WalletService.DAILY_INTEREST_RATE
      const data = <MonetizeSchema>{
        amount: (wallet.balance * rate) / 100,
        description: `Rentabilidade diária da conta corrente (taxa ${rate})`,
      }
      await TransactionService.makeMonetize(data, wallet)
      return true
    }

    return false
  }
}
