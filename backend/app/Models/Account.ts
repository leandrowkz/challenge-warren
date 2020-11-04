import { BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'
import Transaction from 'App/Models/Transaction'
import User from 'App/Models/User'

export default class Account extends BaseModel {
  public static table = 'accounts'

  @column()
  public userId: string | null

  @column()
  public ag: string

  @column()
  public cc: string

  @column()
  public balance: number

  @belongsTo(() => User)
  public account: BelongsTo<typeof User>

  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>
}
