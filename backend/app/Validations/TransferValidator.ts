import { schema } from '@ioc:Adonis/Core/Validator'
import BaseValidator from 'App/Validations/BaseValidator'

export default class TransferValidator extends BaseValidator {
  /**
   * Validation rules.
   */
  public static async getValidationRules () {
    return {
      schema: schema.create({
        amount: schema.number(),
        bank: schema.string(),
        ag: schema.string(),
        cc: schema.string(),
        person_name: schema.string(),
        person_document: schema.string(),
      }),
      messages: {
        'amount.required': 'Valor do depósito é obrigatório.',
        'amount.number': 'Valor do depósito não é um número válido.',
        'bank.required': 'Banco é obrigatório.',
        'ag.required': 'Agência é obrigatório.',
        'cc.required': 'Número da conta é obrigatório.',
        'person_name.required': 'Nome da pessoa é obrigatório.',
        'person_document.required': 'Documento da pessoa é obrigatório.',
      },
    }
  }
}
