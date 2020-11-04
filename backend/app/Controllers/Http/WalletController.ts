import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import WalletService from 'App/Services/WalletService'

export default class WalletController {
  /**
   * Returns given user wallet.
   */
  public async getUserWallet ({ auth } : HttpContextContract) {
    return await WalletService.getUserWallet(<User>auth.user)
  }
}
