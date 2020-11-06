import test from 'japa'
import Database from '@ioc:Adonis/Lucid/Database'
import { useDatabase, useTransactions, useUser } from '../hooks'
import TransactionService from 'App/Services/TransactionService'
import Transaction from 'App/Models/Transaction'
import Detail from 'App/Models/Detail'

test.group('TransactionService', (group) => {
  useDatabase(group)

  // Run tests to all kind of types
  useTransactions().forEach((item) => {
    if (item.debit) {
      test(`ensure ${item.type} is not created to a wallet without balance`, async (assert) => {
        const { wallet } = await useUser()
        const payload = await item.payload()
        const transaction = await TransactionService[item.method](payload, wallet) as Transaction
        assert.isFalse(transaction)
      })
    }

    test(`ensure ${item.type} is created to a wallet with balance`, async (assert) => {
      const { wallet } = await useUser(true)
      const payload = await item.payload()
      const transaction = await TransactionService[item.method](payload, wallet) as Transaction
      assert.instanceOf(transaction, Transaction)
      assert.equal(transaction.walletId, wallet.id)
    })

    test(`ensure ${item.type} is created on database`, async (assert) => {
      const { wallet } = await useUser(true)
      const payload = await item.payload()
      let amount = Number(payload.amount.toFixed(2))
      amount = item.debit ? -amount : amount
      await TransactionService[item.method](payload, wallet) as Transaction
      const transaction = await Database
        .query()
        .where('wallet_id', wallet.id)
        .where('amount', amount)
        .from('transactions')
        .first()
      assert.isTrue(!!transaction)
      assert.deepInclude(transaction, { amount, wallet_id: wallet.id })
    })

    test(`ensure ${item.type} also creates details`, async (assert) => {
      const { wallet } = await useUser(true)
      const payload = await item.payload()
      const transaction = await TransactionService[item.method](payload, wallet) as Transaction
      await transaction.preload('details')
      assert.isTrue(!!transaction.details)
      assert.instanceOf(transaction.details, Detail)
      assert.deepInclude(transaction.details.toJSON(), { description: payload.description })
    })

    test(`ensure ${item.type} also creates details on database`, async (assert) => {
      const { wallet } = await useUser(true)
      const payload = await item.payload()
      const transaction = await TransactionService[item.method](payload, wallet) as Transaction
      const details = await Database
        .query()
        .where('transaction_id', transaction.id)
        .where('description', <string>payload.description)
        .from('details')
        .first()
      assert.isTrue(!!details)
      assert.deepInclude(details, { transaction_id: transaction.id, description: payload.description })
    })
  })
})
