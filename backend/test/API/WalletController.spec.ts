import test from 'japa'
import supertest from 'supertest'
import { useApi, useDatabase, useLogin } from '../hooks'

test.group('WalletAPI', (group) => {
  useDatabase(group)
  const { BASE_URL } = useApi()

  test('ensure wallet returned from api is same from logged user', async (assert) => {
    const { wallet, token } = await useLogin()
    const { body } = await supertest(BASE_URL)
      .get('/wallets')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.equal(wallet.id, body.id)
    assert.equal(wallet.balance, body.balance)
    assert.equal(wallet.userId, body.user_id)
    assert.deepInclude(wallet.toJSON(), body)
  })
})

