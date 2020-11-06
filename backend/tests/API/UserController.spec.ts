import test from 'japa'
import supertest from 'supertest'
import { useDatabase, useApi, useLogin } from '../hooks'

test.group('UserAPI', (group) => {
  useDatabase(group)
  const { BASE_URL } = useApi()

  test('ensure get user info works properly if logged', async (assert) => {
    const { user, token } = await useLogin()

    const { body } = await supertest(BASE_URL)
      .get('/users/me')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.equal(body.id, user.id)
    assert.equal(body.email, user.email)
    assert.deepInclude(user.toJSON(), body)
  })
})

