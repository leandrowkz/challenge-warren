import test from 'japa'
import supertest from 'supertest'
import { useApi, useDatabase } from '../hooks'

test.group('AuthMiddleware', (group) => {
  useDatabase(group)
  const { BASE_URL } = useApi()

  test('ensure auth middleware works properly on users routes (try to get user info not logged)', async () => {
    await supertest(BASE_URL)
      .get('/users/me')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .expect(401)
  })

  test(
    'ensure auth middleware works properly on transactions routes (try to wallet transactions not logged)',
    async () => {
      await supertest(BASE_URL)
        .get('/transactions/history')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
        .expect(401)
    })
})

