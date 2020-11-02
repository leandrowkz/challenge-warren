import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.timestamps(true)
      table.string('id', 25).notNullable().index()
      table.string('name').notNullable()
      table.string('email').notNullable().unique().index()
      table.string('password').notNullable()
      table.string('remember_me_token').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
