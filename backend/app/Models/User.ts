import { beforeCreate, column, computed, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import BaseModel from 'App/Models/BaseModel'
import Transaction from 'App/Models/Transaction'

export interface UserSchema {
  id?: string | null
  name: string
  email: string
  password?: string | null
}

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

  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>
}
