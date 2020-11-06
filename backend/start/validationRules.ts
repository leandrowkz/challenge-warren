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

validator.rule('positive', (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
  /**
   * Report error when value is not positive
   */
  if (value <= 0) {
    errorReporter.report(pointer, 'positive', 'Não é um valor positivo.', arrayExpressionPointer)
  }
})

validator.rule('hasBalance', (value, [{ wallet }], { pointer, arrayExpressionPointer, errorReporter }) => {
  /**
   * Report error when wallet has no balane
   */
  if (!WalletService.hasBalance(wallet, value)) {
    errorReporter.report(pointer, 'hasBalance', 'Saldo da conta é insuficiente 🙁', arrayExpressionPointer)
  }
})
