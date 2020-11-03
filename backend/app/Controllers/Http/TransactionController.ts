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
  public async getUserHistory ({ auth, request } : HttpContextContract) {
    await FilterValidator.validate(request)
    const filters = <FilterSchema>request.all()
    return await TransactionService.getUserHistory(<User>auth.user, filters)
  }

  /**
   * Make deposit to current user.
   */
  public async deposit ({ auth, request } : HttpContextContract) {
    await DepositValidator.validate(request)
    const user = <User>auth.user
    const payload = <DepositSchema>{
      ...request.all(),
      user_id: user.id,
    }
    return await TransactionService.makeDeposit(payload)
  }

  /**
   * Make payment from current user to given document details.
   */
  public async payment ({ auth, request } : HttpContextContract) {
    await PaymentValidator.validate(request)
    const user = <User>auth.user
    const payload = <PaymentSchema>{
      ...request.all(),
      user_id: user.id,
    }
    return await TransactionService.makePayment(payload)
  }
}
