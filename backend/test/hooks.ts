import { nanoid } from 'nanoid'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { DepositSchema } from 'App/Schemas/DepositSchema'
import { PaymentSchema } from 'App/Schemas/PaymentSchema'
import TransactionService from 'App/Services/TransactionService'
import UserService from 'App/Services/UserService'

export const useDatabase = (group: any) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
}

export const useUser = async (withBalance: boolean = false) => {
  const data = {
    name: 'Test user',
    email: `test@test-${nanoid(5)}.com`,
    password: 'testing',
  }
  const user = await UserService.create(data) as User
  await user.preload('wallet')
  const wallet = user.wallet

  // Create good balance
  if (withBalance) {
    const deposit = await useDeposit(100000000)
    await TransactionService.makeDeposit(deposit, wallet)
  }

  return {
    user,
    wallet,
  }
}

export const usePayment = async () => {
  const amount = Math.random() * Math.random() + 1
  const payment = <PaymentSchema>{
    amount,
    barcode: nanoid(20),
    description: `Payment ${nanoid(5)}`,
  }
  return payment
}

export const useDeposit = async (amount: number = 0) => {
  const value = (!!amount === false) ? Math.random() * Math.random() + 1 : amount
  const payment = <DepositSchema>{
    amount: value,
    description: `Deposit ${nanoid(5)}`,
  }
  return payment
}
