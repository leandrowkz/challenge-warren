
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DepositSchema } from 'App/Schemas/DepositSchema'
import { FilterSchema } from 'App/Schemas/FilterSchema'
import { PaymentSchema } from 'App/Schemas/PaymentSchema'
import { TransferSchema } from 'App/Schemas/TransferSchema'
import { WithdrawSchema } from 'App/Schemas/WithdrawSchema'
import TransactionService from 'App/Services/TransactionService'
import DepositValidator from 'App/Validations/DepositValidator'
import FilterValidator from 'App/Validations/FilterValidator'
import HasBalanceValidator from 'App/Validations/HasBalanceValidator'
import PaymentValidator from 'App/Validations/PaymentValidator'
import TransferValidator from 'App/Validations/TransferValidator'
import WithdrawValidator from 'App/Validations/WithdrawValidator'

export default class TransactionController {
  /**
   * Returns all user logged tags.
   */
  public async getWalletHistory ({ auth, request } : HttpContextContract) {
    await FilterValidator.validate(request)
    const filters = <FilterSchema>request.all()
    const user = <User>auth.user
    await user.preload('wallet')
    return await TransactionService.getWalletHistory(user.wallet, filters)
  }

  /**
   * Make deposit to current user.
   */
  public async deposit ({ auth, request } : HttpContextContract) {
    await DepositValidator.validate(request)
    const user = <User>auth.user
    await user.preload('wallet')
    const payload = <DepositSchema>request.all()
    return await TransactionService.makeDeposit(payload, user.wallet)
  }

  /**
   * Make payment from current user to given document details.
   */
  public async payment ({ auth, request } : HttpContextContract) {
    await HasBalanceValidator.validate(request, auth)
    await PaymentValidator.validate(request)
    const user = <User>auth.user
    await user.preload('wallet')
    const payload = <PaymentSchema>request.all()
    return await TransactionService.makePayment(payload, user.wallet)
  }

  /**
   * Make transfet to another bank account from current user to given target account details.
   */
  public async transfer ({ auth, request } : HttpContextContract) {
    await HasBalanceValidator.validate(request, auth)
    await TransferValidator.validate(request)
    const user = <User>auth.user
    await user.preload('wallet')
    const payload = <TransferSchema>request.all()
    return await TransactionService.makeTransfer(payload, user.wallet)
  }

  /**
   * Make transfet to another bank account from current user to given target account details.
   */
  public async withdraw ({ auth, request } : HttpContextContract) {
    await HasBalanceValidator.validate(request, auth)
    await WithdrawValidator.validate(request)
    const user = <User>auth.user
    await user.preload('wallet')
    const payload = <WithdrawSchema>request.all()
    return await TransactionService.makeWithdraw(payload, user.wallet)
  }
}
