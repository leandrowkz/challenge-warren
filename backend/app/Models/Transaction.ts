import { BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'
import Account from 'App/Models/Account'
import Detail from 'App/Models/Detail'

export default class Transaction extends BaseModel {
  public static table = 'transactions'

  @column()
  public accountId: string | null

  @column()
  public type: string

  @column()
  public when: string

  @column()
  public amount: number

  @column()
  public description: string

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @hasOne(() => Detail)
  public details: HasOne<typeof Detail>
}
