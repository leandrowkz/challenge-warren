import { BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'
import Account from 'App/Models/Wallet'
import Detail from 'App/Models/Detail'

export default class Transaction extends BaseModel {
  public static table = 'transactions'

  @column({ serializeAs: null })
  public walletId: string | null

  @column()
  public type: string

  @column()
  public when: string

  @column({
    prepare: (value: any) => Number(parseFloat(value).toFixed(2)),
    serialize: (value: any) => Number(parseFloat(value).toFixed(2)),
  })
  public amount: number

  @column()
  public description: string

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @hasOne(() => Detail)
  public details: HasOne<typeof Detail>
}
