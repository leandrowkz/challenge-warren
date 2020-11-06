import { BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'
import Transaction from 'App/Models/Transaction'
import User from 'App/Models/User'

export default class Wallet extends BaseModel {
  public static table = 'wallets'

  @column()
  public userId: string | null

  @column()
  public ag: string

  @column()
  public cc: string

  @column({
    prepare: (value: any) => Number(parseFloat(value).toFixed(2)),
    serialize: (value: any) => Number(parseFloat(value).toFixed(2)),
  })
  public balance: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>
}
