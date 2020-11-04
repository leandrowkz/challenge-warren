import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
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
    await user.preload('account')
    return await TransactionService.getAccountHistory(user.account, filters)
  }

  /**
   * Make deposit to current user.
   */
  public async deposit ({ auth, request } : HttpContextContract) {
    await DepositValidator.validate(request)
    const user = <User>auth.user
    await user.preload('account')
    const payload = <DepositSchema>{
      ...request.all(),
      account_id: user.account.id,
    }
    return await TransactionService.makeDeposit(payload)
  }

  /**
   * Make payment from current user to given document details.
   */
  public async payment ({ auth, request } : HttpContextContract) {
    await PaymentValidator.validate(request)
    const user = <User>auth.user
    await user.preload('account')
    const payload = <PaymentSchema>{
      ...request.all(),
      account_id: user.account.id,
    }
    return await TransactionService.makePayment(payload)
  }
}
