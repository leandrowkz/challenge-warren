import { schema } from '@ioc:Adonis/Core/Validator'
import BaseValidator from 'App/Validations/BaseValidator'

export default class FilterValidator extends BaseValidator {
  /**
   * Validation rules.
   */
  public static async getValidationRules () {
    return {
      schema: schema.create({
        type: schema.enum(['all', 'payment', 'deposit', 'withdraw', 'transfer'] as const),
        from: schema.date(),
        to: schema.date(),
      }),
      messages: {
        'type.required': 'Tipo de transação do extrado é obrigatório.',
        'type.enum': 'Tipo de transação do extrato não é válido.',
        'from.required': 'Data de início do extrato é obrigatória.',
        'from.date': 'Data de início do extrato não é válida.',
        'to.required': 'Data de fim do extrato é obrigatória.',
        'to.date': 'Data de fim do extrato não é válida.',
      },
    }
  }
}
