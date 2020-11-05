
/**
 * Contract source: https://git.io/Jfefs
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

declare module '@ioc:Adonis/Core/Validator' {
  import Wallet from 'App/Models/Wallet'
  import { Rule } from '@ioc:Adonis/Core/Validator'

  export interface Rules {
    positive (): Rule
    hasBalance (options: { wallet: Wallet }): Rule
  }
}
