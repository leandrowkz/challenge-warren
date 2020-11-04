import Account from 'App/Models/Account'
import User from 'App/Models/User'

export default class AccountService {
  /**
   * Make a random CC number.
   */
  public static async makeCC (): Promise<string> {
    const prefix = Math.floor(Math.random() * 100000).toString()
    const digit = Math.random().toString()
    return `${prefix}-${digit}`
  }

  /**
   * Make an account to given user. If user already has, return it.
   */
  public static async makeUserAccount (user: User): Promise<Account> {
    // User already has an account
    let account = await this.getUserAccount(user)
    if (account) {
      return account
    }

    // Build a new account
    const ag = '000001'
    const cc = await this.makeCC()
    account = await Account.query().where('ag', ag).where('cc', cc).first() as Account

    // No account exists with those values, create a new one to user
    if (!account) {
      account = new Account()
      account.userId = user.id
      account.ag = ag
      account.cc = cc
      account.balance = 0
      await account.save()
      return account
    }

    // An account already exists with this code, attempt to create a new one
    return this.makeUserAccount(user)
  }

  /**
   * Returns user account or false if user does not has onde.
   */
  public static async getUserAccount (user: User) : Promise<Account | false> {
    await user.preload('account')
    return user.account || false
  }
}
