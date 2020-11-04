import { beforeCreate, column, computed, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import BaseModel from 'App/Models/BaseModel'
import Wallet from 'App/Models/Wallet'

export default class User extends BaseModel {
  public static table = 'users'

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @computed()
  public get first_name () {
    return this.name.split(' ')[0] || this.name
  }

  @hasOne(() => Wallet)
  public wallet: HasOne<typeof Wallet>

  @beforeCreate()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
