import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserController {
  /**
   * Returns current logged user.
   */
  public async me ({ auth, response } : HttpContextContract) {
    const user = <User>auth.user
    if (!user) {
      return response.status(404).json({ message: 'Not found.' })
    }
    return User.find(user.id)
  }
}
