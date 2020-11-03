import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'
import Transaction from 'App/Models/Transaction'

export default class Detail extends BaseModel {
  public static table = 'details'

  @column()
  public transactionId: string | null

  @column()
  public barcode: string

  @column()
  public bank: string

  @column()
  public cc: string

  @column()
  public ag: string

  @column()
  public description: string

  @belongsTo(() => Transaction)
  public transaction: BelongsTo<typeof Transaction>
}
