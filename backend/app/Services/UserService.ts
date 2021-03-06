import { UserSchema } from 'App/Schemas/UserSchema'
import User from 'App/Models/User'
import WalletService from 'App/Services/WalletService'

export default class UserService {
  /**
   * Creates new user according to given data.
   */
  public static async create (data: UserSchema) : Promise<User | false> {
    // Empty values
    if (!data || !data.name || !data.email || !data.password) {
      return false
    }

    // Prevent insert duplicated users
    if (!!(await User.query().where('email', data.email).first()) === true) {
      return false
    }

    // Create user
    const user = new User()
    user.name = data.name
    user.email = data.email
    user.password = data.password || UserService.makeRandomPassword()
    await user.save()

    // Make a wallet to this user
    await WalletService.makeUserWallet(user)
    return user
  }

  /**
   * Makes a random password.
   *
   * @return string
   */
  public static makeRandomPassword () : string {
    return Math.random().toString()
  }
}
