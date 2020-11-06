import { rules, schema } from '@ioc:Adonis/Core/Validator'
import BaseValidator from 'App/Validations/BaseValidator'

export default class TransferValidator extends BaseValidator {
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
        bank: schema.string(),
        ag: schema.string(),
        cc: schema.string(),
        person_name: schema.string(),
        person_document: schema.string(),
      }),
      messages: {
        'amount.required': 'Valor da transferência é obrigatório.',
        'amount.number': 'Valor da transferência não é um número válido.',
        'amount.positive': 'Valod da transferência não é positivo.',
        'bank.required': 'Banco é obrigatório.',
        'ag.required': 'Agência é obrigatório.',
        'cc.required': 'Número da conta é obrigatório.',
        'person_name.required': 'Nome da pessoa é obrigatório.',
        'person_document.required': 'Documento da pessoa é obrigatório.',
      },
    }
  }
}
