import { rules, schema } from '@ioc:Adonis/Core/Validator'
import BaseValidator from 'App/Validations/BaseValidator'

export default class SignUpValidator extends BaseValidator {
  /**
   * Validation rules.
   */
  public static async getValidationRules () {
    return {
      schema: schema.create({
        name: schema.string({}, [
          rules.required(),
        ]),
        email: schema.string({}, [
          rules.email({}),
          rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string({}, [
          rules.minLength(6),
        ]),
        confirm_password: schema.string({}, [
          rules.confirmed('password'),
        ]),
      }),
      messages: {
        'name.required': 'Nome é obrigatório.',
        'email.required': 'Email é obrigatório.',
        'email.email': 'Email não é um email válido.',
        'email.unique': 'Já existe uma conta cadastrada com este email.',
        'password.required': 'Senha é obrigatório.',
        'password.minLength': 'Senha deve possuir no mínimo 6 caracteres.',
        'password.confirmed': 'Senhas não são iguais.',
        'confirm_password.required': 'Confirmação de senha é obrigatório.',
      },
    }
  }
}
