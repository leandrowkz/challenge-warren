import test from 'japa'
import Database from '@ioc:Adonis/Lucid/Database'
import { useDatabase, usePayment, useUser } from '../hooks'
import TransactionService from 'App/Services/TransactionService'
import Transaction from 'App/Models/Transaction'
import Detail from 'App/Models/Detail'

test.group('TransactionService', (group) => {
  useDatabase(group)

  test('ensure payment is not created to a wallet without balance', async (assert) => {
    const { wallet } = await useUser()
    const payment = await usePayment()
    const transaction = await TransactionService.makePayment(payment, wallet) as Transaction
    assert.isFalse(transaction)
  })

  test('ensure payment is created to a wallet with balance', async (assert) => {
    const { wallet } = await useUser(true)
    const payment = await usePayment()
    const transaction = await TransactionService.makePayment(payment, wallet) as Transaction
    assert.instanceOf(transaction, Transaction)
    assert.equal(transaction.walletId, wallet.id)
  })

  test('ensure payment is created on database', async (assert) => {
    const { wallet } = await useUser(true)
    const payment = await usePayment()
    const amount = -Number(payment.amount.toFixed(2))
    await TransactionService.makePayment(payment, wallet) as Transaction
    const transaction = await Database
      .query()
      .where('wallet_id', wallet.id)
      .where('amount', amount)
      .from('transactions')
      .first()
    assert.isTrue(!!transaction)
    assert.deepInclude(transaction, { amount, wallet_id: wallet.id })
  })

  test('ensure payment also creates details', async (assert) => {
    const { wallet } = await useUser(true)
    const payment = await usePayment()
    const transaction = await TransactionService.makePayment(payment, wallet) as Transaction
    await transaction.preload('details')
    assert.isTrue(!!transaction.details)
    assert.instanceOf(transaction.details, Detail)
    assert.deepInclude(transaction.details.toJSON(), { description: payment.description })
  })

  test('ensure payment also creates details on database', async (assert) => {
    const { wallet } = await useUser(true)
    const payment = await usePayment()
    const transaction = await TransactionService.makePayment(payment, wallet) as Transaction
    const details = await Database
      .query()
      .where('transaction_id', transaction.id)
      .where('description', <string>payment.description)
      .from('details')
      .first()
    assert.isTrue(!!details)
    assert.deepInclude(details, { transaction_id: transaction.id, description: payment.description })
  })
})
