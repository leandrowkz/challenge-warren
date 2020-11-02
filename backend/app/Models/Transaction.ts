import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'
import User from 'App/Models/User'

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

  @belongsTo(() => User)
  public transactions: BelongsTo<typeof User>
}
