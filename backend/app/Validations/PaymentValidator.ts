import { schema } from '@ioc:Adonis/Core/Validator'
import BaseValidator from 'App/Validations/BaseValidator'

export default class PaymentValidator extends BaseValidator {
  /**
   * Validation rules.
   */
  public static async getValidationRules () {
    return {
      schema: schema.create({
        amount: schema.number(),
        barcode: schema.number(),
      }),
      messages: {
        'amount.required': 'Valor do depósito é obrigatório.',
        'amount.number': 'Valor do depósito não é um número válido.',
        'barcode.required': 'Linha digitável é obrigatória.',
        'barcode.number': 'Linha digitável não é um número válido.',
      },
    }
  }
}
