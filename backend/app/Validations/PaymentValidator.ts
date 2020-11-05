import { rules, schema } from '@ioc:Adonis/Core/Validator'
import BaseValidator from 'App/Validations/BaseValidator'

export default class PaymentValidator extends BaseValidator {
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
        barcode: schema.number(),
      }),
      messages: {
        'amount.required': 'Valor do pagamento é obrigatório.',
        'amount.number': 'Valor do pagamento não é um número válido.',
        'amount.positive': 'Valod do pagamento não é positivo.',
        'barcode.required': 'Linha digitável é obrigatória.',
        'barcode.number': 'Linha digitável não é um número válido.',
      },
    }
  }
}
