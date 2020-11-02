import { RequestContract } from '@ioc:Adonis/Core/Request'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserSchema } from 'App/Models/User'
import UserService from 'App/Services/UserService'
import SignUpValidator from 'App/Validations/SignUpValidator'

export default class AuthController {
  /**
   * Attempt to get auth token based on request params.
   */
  protected async getToken(auth: AuthContract, request: RequestContract): Promise<string> {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.attempt(email, password)
    return token.toJSON()
  }

  /**
   * Register a new user.
   */
  public async signUp({ auth, request }: HttpContextContract): Promise<string> {
    await SignUpValidator.validate(request)
    await UserService.create(<UserSchema>request.all())
    return await this.getToken(auth, request)
  }

  /**
   * Authenticate user and generates token.
   */
  public async signIn({ auth, request }: HttpContextContract): Promise<string> {
    return this.getToken(auth, request)
  }

  /**
   * Logout user (destroys token).
   */
  public async signOut({ auth }: HttpContextContract): Promise<object> {
    await auth.logout()
    return { status: true }
  }
}
