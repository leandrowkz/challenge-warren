import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

test.group('AuthAPI', () => {
  test('ensure user is not created with invalid data (422)', async (assert) => {
    /**
     * Make request
     */
    await supertest(BASE_URL).post('/auth/signup').expect(422)
  })

  test('ensure login is not done with invalid credentials (400)', async (assert) => {
    /**
     * Make request
     */
    await supertest(BASE_URL).post('/auth/signin').expect(400)
  })
})

