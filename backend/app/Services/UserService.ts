import User, { UserSchema } from 'App/Models/User'

export default class UserService {
  /**
   * Creates new user according to given data.
   */
  public static async create (data: UserSchema) : Promise<User> {
    const user = new User()
    user.name = data.name
    user.email = data.email
    user.password = data.password || UserService.randomPassword()
    await user.save()
    return user
  }

  /**
   * Makes a random password.
   *
   * @return string
   */
  public static randomPassword () : string {
    return Math.random().toString()
  }
}
