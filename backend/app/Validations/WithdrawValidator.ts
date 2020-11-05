import { rules, schema } from '@ioc:Adonis/Core/Validator'
import BaseValidator from 'App/Validations/BaseValidator'

export default class WithdrawValidator extends BaseValidator {
  /**
   * Validation rules.
   */
  public static async getValidationRules () {
    return {
      schema: schema.create({
        amount: schema.number([
          rules.unsigned(),
          rules.positive(),
        ]),
      }),
      messages: {
        'amount.required': 'Valor do saque é obrigatório.',
        'amount.number': 'Valor do saque não é um número válido.',
        'amount.positive': 'Valod do saque não é positivo.',
      },
    }
  }
}
