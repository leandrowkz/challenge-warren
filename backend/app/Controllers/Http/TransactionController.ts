import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { FilterSchema } from 'App/Schemas/FilterSchema'
import TransactionService from 'App/Services/TransactionService'
import FilterValidator from 'App/Validations/FilterValidator'

export default class TransactionController {
  /**
   * Returns all user logged tags.
   */
  public async getUserHistory ({ auth, request } : HttpContextContract) {
    await FilterValidator.validate(request)
    const filters = <FilterSchema>request.all()
    return await TransactionService.getUserHistory(<User>auth.user, filters)
  }
}
