import { DateTime } from 'luxon'
import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'
import { useApi, useDatabase, useLogin, usePayment } from '../hooks'

test.group('TransactionAPI', (group) => {
  useDatabase(group)
  const { BASE_URL } = useApi()

  test('ensure transactions from logged user is same from database wallet', async (assert) => {
    const { wallet, token } = await useLogin(true, true)

    await wallet.preload('transactions')

    const filters = {
      type: 'all',
      from: DateTime.local().startOf('month').toISODate(),
      to: DateTime.local().endOf('month').toISODate(),
    }

    const { body } = await supertest(BASE_URL)
      .get('/transactions/history')
      .query(filters)
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const apiTotal = Number(body.transactions.reduce((prev, item) => prev + item.amount, 0).toFixed(2))
    const modelTotal = Number(wallet.transactions.reduce((prev, item) => prev + item.amount, 0).toFixed(2))

    assert.equal(body.total, wallet.balance)
    assert.equal(body.transactions.length, wallet.transactions.length)
    assert.equal(apiTotal, modelTotal)
  })

  test('ensure make payment inserts on database and changes wallet balance', async (assert) => {
    const { user, wallet, token } = await useLogin(true, true)
    const payment = await usePayment()
    const amount = Number(payment.amount.toFixed(2))

    const { body } = await supertest(BASE_URL)
      .post('/transactions/payment')
      .send(payment)
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const transaction = await Database
      .query()
      .where('id', body.id)
      .where('wallet_id', wallet.id)
      .where('amount', -amount)
      .from('transactions')
      .first()

    await user.preload('wallet')

    const total = Number((wallet.balance - amount).toFixed(2))
    assert.isTrue(!!transaction)
    assert.equal(body.amount, -amount)
    assert.notEqual(wallet.balance, user.wallet.balance)
    assert.equal(total, user.wallet.balance)
  })
})

