import { rules, schema } from '@ioc:Adonis/Core/Validator'
import BaseValidator from 'App/Validations/BaseValidator'

export default class DepositValidator extends BaseValidator {
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
        'amount.required': 'Valor do depósito é obrigatório.',
        'amount.number': 'Valor do depósito não é um número válido.',
        'amount.positive': 'Valod do depósito não é positivo.',
      },
    }
  }
}
