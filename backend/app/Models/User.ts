import { afterCreate, beforeCreate, column, computed, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import BaseModel from 'App/Models/BaseModel'
import Account from 'App/Models/Account'
import AccountService from 'App/Services/AccountService'

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

  @beforeCreate()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @afterCreate()
  public static async makeAccount (user: User) {
    await AccountService.makeUserAccount(user)
  }

  @hasOne(() => Account)
  public account: HasOne<typeof Account>
}
