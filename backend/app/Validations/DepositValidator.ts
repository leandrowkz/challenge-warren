import { schema } from '@ioc:Adonis/Core/Validator'
import BaseValidator from 'App/Validations/BaseValidator'

export default class DepositValidator extends BaseValidator {
  /**
   * Validation rules.
   */
  public static async getValidationRules () {
    return {
      schema: schema.create({
        amount: schema.number(),
      }),
      messages: {
        'amount.required': 'Valor do depósito é obrigatório.',
        'amount.number': 'Valor do depósito não é um número válido.',
      },
    }
  }
}
