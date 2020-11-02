import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { validator } from '@ioc:Adonis/Core/Validator'
import { RequestContract } from '@ioc:Adonis/Core/Request'

export default class BaseValidator {
  /**
   * Returns all validation rules and messages.
   *
   * YOU MUST OVERRIDE THIS.
   */
  public static async getValidationRules (_request?: RequestContract, _auth?: AuthContract) : Promise<any> {}

  /**
   * Appends correct parameters for validation schema.
   */
  protected static async buildParams (request: RequestContract, auth?: AuthContract) {
    return {
      ...await this.getValidationRules(request, auth),
      reporter: validator.reporters.api,
    }
  }

  /**
   * Validates a given request.
   */
  public static async validate (request: RequestContract, auth?: AuthContract) {
    const params = await this.buildParams(request, auth)
    return request.validate(params)
  }
}
