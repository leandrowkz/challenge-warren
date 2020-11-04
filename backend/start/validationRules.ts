/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator'
import WalletService from 'App/Services/WalletService'

validator.rule('hasBalance', (value, [{ wallet }], { pointer, arrayExpressionPointer, errorReporter }) => {
  /**
   * Report error when phone number is not valid
   */
  if (!WalletService.hasBalance(wallet, value)) {
    errorReporter.report(pointer, 'hasBalance', 'Saldo da conta é insuficiente 🙁', arrayExpressionPointer)
  }
})
