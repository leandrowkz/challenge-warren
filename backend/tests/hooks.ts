import supertest from 'supertest'
import { customAlphabet, nanoid } from 'nanoid'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { DepositSchema } from 'App/Schemas/DepositSchema'
import { MonetizeSchema } from 'App/Schemas/MonetizeSchema'
import { PaymentSchema } from 'App/Schemas/PaymentSchema'
import { TransferSchema } from 'App/Schemas/TransferSchema'
import { WithdrawSchema } from 'App/Schemas/WithdrawSchema'
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

export const useApi = () => {
  const nanoid = customAlphabet('1234567890abcdef', 5)
  const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`
  return {
    nanoid,
    BASE_URL,
  }
}

export const useUser = async (withBalance: boolean = false, randomTransactions: boolean = false) => {
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

  // Make random transactions
  if (randomTransactions) {
    await Promise.all(
      useTransactions().map(async (item) => {
        for (let i = 0; i < item.random; i++) {
          TransactionService[item.method](await item.payload(), wallet)
        }
      })
    )
  }

  return {
    user,
    wallet,
  }
}

export const useTransactions = () => {
  return [
    {
      type: 'deposit',
      debit: false,
      payload: () => useDeposit(),
      method: 'makeDeposit',
      random: Math.floor(Math.random() * 10) + 1,
    },
    {
      type: 'payment',
      debit: true,
      payload: () => usePayment(),
      method: 'makePayment',
      random: Math.floor(Math.random() * 10) + 1,
    },
    {
      type: 'transfer',
      debit: true,
      payload: () => useTransfer(),
      method: 'makeTransfer',
      random: Math.floor(Math.random() * 10) + 1,
    },
    {
      type: 'withdraw',
      debit: true,
      payload: () => useWithdraw(),
      method: 'makeWithdraw',
      random: Math.floor(Math.random() * 10) + 1,
    },
    {
      type: 'monetize',
      debit: false,
      payload: () => useMonetize(),
      method: 'makeMonetize',
      random: Math.floor(Math.random() * 10) + 1,
    },
  ]
}

export const useLogin = async (withBalance: boolean = false, randomTransactions: boolean = false) => {
  const { user, wallet } = await useUser(withBalance, randomTransactions)
  const { BASE_URL } = useApi()
  const login = {
    email: user.email,
    password: 'testing',
  }
  const { body } = await supertest(BASE_URL)
    .post('/auth/signin')
    .set('Accept', 'application/json')
    .set('Content-type', 'application/json')
    .send(login)
  return {
    user,
    wallet,
    token: body.token,
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

export const useWithdraw = async () => {
  const amount = Math.random() * Math.random() + 1
  const withdraw = <WithdrawSchema>{
    amount,
    description: `Withdraw ${nanoid(5)}`,
  }
  return withdraw
}

export const useTransfer = async () => {
  const amount = Math.random() * Math.random() + 1
  const transfer = <TransferSchema>{
    amount,
    bank: nanoid(5),
    ag: nanoid(5),
    cc: nanoid(5),
    person_name: `Pessoa ${nanoid(5)}`,
    person_document: `Documento ${nanoid(5)}`,
    description: `Transfer ${nanoid(5)}`,
  }
  return transfer
}

export const useMonetize = async (amount: number = 0) => {
  const value = (!!amount === false) ? Math.random() * Math.random() + 1 : amount
  const monetize = <MonetizeSchema>{
    amount: value,
    description: `Monetize ${nanoid(5)}`,
  }
  return monetize
}

export const useDeposit = async (amount: number = 0) => {
  const value = (!!amount === false) ? Math.random() * Math.random() + 1 : amount
  const payment = <DepositSchema>{
    amount: value,
    description: `Deposit ${nanoid(5)}`,
  }
  return payment
}
