import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import BaseValidator from 'App/Validations/BaseValidator'

export default class HasBalanceValidator extends BaseValidator {
  /**
   * Validation rules.
   */
  public static async getValidationRules (_: any, auth: AuthContract) {
    const user = <User>auth.user
    await user.preload('wallet')
    return {
      schema: schema.create({
        amount: schema.number([
          rules.hasBalance({ wallet: user.wallet }),
        ]),
      }),
      messages: {
        'amount.required': 'Valor é obrigatório.',
        'amount.hasBalance': 'Saldo da conta é insuficiente 🙁',
      },
    }
  }
}
