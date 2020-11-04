import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DepositSchema } from 'App/Schemas/DepositSchema'
import { FilterSchema } from 'App/Schemas/FilterSchema'
import { PaymentSchema } from 'App/Schemas/PaymentSchema'
import TransactionService from 'App/Services/TransactionService'
import DepositValidator from 'App/Validations/DepositValidator'
import FilterValidator from 'App/Validations/FilterValidator'
import PaymentValidator from 'App/Validations/PaymentValidator'

export default class TransactionController {
  /**
   * Returns all user logged tags.
   */
  public async getAccountHistory ({ auth, request } : HttpContextContract) {
    await FilterValidator.validate(request)
    const filters = <FilterSchema>request.all()
    const user = <User>auth.user
    await user.preload('wallet')
    console.log(user)
    return await TransactionService.getWalletHistory(user.wallet, filters)
  }

  /**
   * Make deposit to current user.
   */
  public async deposit ({ auth, request } : HttpContextContract) {
    await DepositValidator.validate(request)
    const user = <User>auth.user
    await user.preload('wallet')
    const payload = <DepositSchema>{
      ...request.all(),
      wallet_id: user.wallet.id,
    }
    return await TransactionService.makeDeposit(payload)
  }

  /**
   * Make payment from current user to given document details.
   */
  public async payment ({ auth, request } : HttpContextContract) {
    await PaymentValidator.validate(request)
    const user = <User>auth.user
    await user.preload('wallet')
    const payload = <PaymentSchema>{
      ...request.all(),
      wallet_id: user.wallet.id,
    }
    return await TransactionService.makePayment(payload)
  }
}
