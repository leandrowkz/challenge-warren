import test from 'japa'
import { useDatabase, useDeposit, usePayment, useUser } from '../hooks'
import User from 'App/Models/User'
import Wallet from 'App/Models/Wallet'
import TransactionService from 'App/Services/TransactionService'
import WalletService from 'App/Services/WalletService'

test.group('WalletService', (group) => {
  useDatabase(group)

  test('ensure wallet is not created to invalid user', async (assert) => {
    const wallet = await WalletService.makeUserWallet(<any>null)
    assert.isFalse(wallet)
  })

  test('ensure wallet is created to a valid user', async (assert) => {
    const user = new User()
    user.name = 'test'
    user.email = `test@testing-${Math.random().toString}.com`
    user.password = 'test'
    await user.save()
    const wallet = await WalletService.makeUserWallet(user)
    assert.instanceOf(wallet, Wallet)
  })

  test('ensure wallet is never returned to an invalid user', async (assert) => {
    assert.isFalse(await WalletService.getUserWallet(<any>null))
  })

  test('ensure wallet balance changes properly when a credit is made', async (assert) => {
    const { wallet } = await useUser(true)
    const deposit = await useDeposit()
    const amount = Number(deposit.amount.toFixed(2))
    const balancePrev = wallet.balance
    await TransactionService.makeDeposit(deposit, wallet)
    assert.equal((balancePrev + amount), wallet.balance)
  })

  test('ensure wallet balance changes properly when a debit is made', async (assert) => {
    const { wallet } = await useUser(true)
    const payment = await usePayment()
    const amount = Number(payment.amount.toFixed(2))
    const balancePrev = wallet.balance
    await TransactionService.makePayment(payment, wallet)
    assert.equal((balancePrev - amount), wallet.balance)
  })

  test('ensure wallet balance monetizes properly', async (assert) => {
    const { wallet } = await useUser(true)
    const profit = (wallet.balance * WalletService.DAILY_INTEREST_RATE) / 100
    const balancePrev = wallet.balance
    const response = await WalletService.monetizeBalance(wallet)
    assert.isTrue(response)
    assert.equal((balancePrev + profit), wallet.balance)
  })

  test('ensure wallet balance does not monetizes when it has already run daily routine', async (assert) => {
    const { wallet } = await useUser(true)
    const profit = (wallet.balance * WalletService.DAILY_INTEREST_RATE) / 100
    const balancePrev = wallet.balance
    const responsePrev = await WalletService.monetizeBalance(wallet)
    const responseNext = await WalletService.monetizeBalance(wallet)
    assert.isTrue(responsePrev)
    assert.isFalse(responseNext)
    assert.equal((balancePrev + profit), wallet.balance)
  })
})
