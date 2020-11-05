import test from 'japa'
import { nanoid } from 'nanoid'
import { useDatabase } from '../hooks'
import User from 'App/Models/User'
import Wallet from 'App/Models/Wallet'
import UserService from 'App/Services/UserService'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('UserService', (group) => {
  useDatabase(group)

  const userData = () => ({
    name: 'test user',
    email: `test@test-${nanoid(5)}.com`,
    password: 'testing',
  })

  test('ensure user is not created with invalid data', async (assert: any) => {
    const user = await UserService.create(<any>null)
    assert.isFalse(user)
  })

  test('ensure user is created with valid data', async (assert) => {
    const user = await UserService.create(userData())
    assert.instanceOf(user, User)
  })

  test('ensure user is not created with duplicated email', async (assert) => {
    const data = userData()
    await UserService.create(data)
    const userDuplicated = await UserService.create(data)
    assert.isFalse(userDuplicated)
    assert.notInstanceOf(userDuplicated, User)
  })

  test('ensure user is inside database when is created', async (assert) => {
    const data = userData()
    const { name, email } = data
    await UserService.create(data)
    const user = await Database.query().where('email', data.email).from('users').first()
    assert.isNotFalse(!!user)
    assert.deepInclude(user, { name, email })
  })

  test('ensure a wallet is also created when user is created', async (assert) => {
    const user = await UserService.create(userData()) as User
    await user.preload('wallet')
    const wallet = await Database.query().where('user_id', user.id).from('wallets').first()
    assert.isNotFalse(!!wallet)
    assert.deepInclude(wallet, user.wallet.toJSON())
    assert.isNotFalse(!!user.wallet)
    assert.instanceOf(user.wallet, Wallet)
  })
})
