import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AccountService from 'App/Services/AccountService'

export default class AccountController {
  /**
   * Returns all user logged tags.
   */
  public async getUserAccount ({ auth } : HttpContextContract) {
    return await AccountService.getUserAccount(<User>auth.user)
  }
}
