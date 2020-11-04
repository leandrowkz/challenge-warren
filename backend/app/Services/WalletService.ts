import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Wallet from 'App/Models/Wallet'

export default class WalletService {
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
  public static async makeUserWallet (user: User): Promise<void> {
    // User already has an wallet
    let wallet = await this.getUserWallet(user)
    if (wallet) {
      return
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
    } else {
      // An wallet already exists with this code, attempt to create a new one
      await this.makeUserWallet(user)
    }
  }

  /**
   * Returns user wallet or false if user does not has onde.
   */
  public static async getUserWallet (user: User) : Promise<Wallet | false> {
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

    wallet.balance = total.sum

    await wallet.save()
    return true
  }
}
