import { column } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'

export interface TransactionSchema {
  id?: string
  user_id: string
  type: 'deposit' | 'withdraw' | 'payment'
  when: string
  amount: number
  description: string
}

export default class Transaction extends BaseModel {
  public static table = 'transactions'

  @column()
  public userId: string | null

  @column()
  public type: string

  @column()
  public when: string

  @column()
  public amount: number

  @column()
  public description: string
}
