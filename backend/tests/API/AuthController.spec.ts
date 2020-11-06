import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'
import { useApi, useDatabase, useUser } from '../hooks'

test.group('AuthAPI', (group) => {
  useDatabase(group)
  const { nanoid, BASE_URL } = useApi()

  test('ensure signup user is not created with invalid data (422)', async () => {
    await supertest(BASE_URL)
      .post('/auth/signup')
      .expect(422)
  })

  test('ensure signin is not done with invalid credentials (400)', async () => {
    await supertest(BASE_URL)
      .post('/auth/signin')
      .expect(400)
  })

  test('ensure signup works with valid data', async (assert) => {
    const user = {
      name: 'Test user',
      email: `test@test-${nanoid()}.com`,
      password: 'testing',
      confirm_password: 'testing',
    }
    const { body } = await supertest(BASE_URL).post('/auth/signup')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(user)
      .expect(200)
    const dbUser = await Database.query().where('email', user.email).from('users').first()

    assert.isTrue(!!dbUser)
    assert.hasAllKeys(body, ['token', 'type'])
    assert.isString(body.token)
  })

  test('ensure signin works with valid data', async (assert) => {
    const { user } = await useUser()
    const login = {
      email: user.email,
      password: 'testing',
    }
    const { body } = await supertest(BASE_URL).post('/auth/signin')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(login)
      .expect(200)
    assert.hasAllKeys(body, ['token', 'type'])
    assert.isString(body.token)
  })

  test('ensure auth middleware works properly (try to get user info not logged)', async () => {
    await supertest(BASE_URL)
      .get('/users/me')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .expect(401)
  })
})

