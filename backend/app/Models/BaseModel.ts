import { DateTime } from 'luxon'
import { beforeCreate, BaseModel as LucidModel, column } from '@ioc:Adonis/Lucid/Orm'
import { nanoid } from 'nanoid'

export default class BaseModel extends LucidModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async makeId (model: BaseModel) {
    model.id = nanoid(21)
  }
}
