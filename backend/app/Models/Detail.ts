import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Models/BaseModel'
import Transaction from 'App/Models/Transaction'

export default class Detail extends BaseModel {
  public static table = 'details'

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @column({ serializeAs: null })
  public transactionId: string | null

  @column()
  public barcode: string

  @column()
  public bank: string

  @column()
  public ag: string

  @column()
  public cc: string

  @column()
  public personName: string

  @column()
  public personDocument: string

  @column()
  public description: string | null

  @belongsTo(() => Transaction)
  public transaction: BelongsTo<typeof Transaction>
}
