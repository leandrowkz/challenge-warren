import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Wallets extends BaseSchema {
  protected tableName = 'wallets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.timestamps(true)
      table.string('id', 25).notNullable().index()
      table.string('user_id', 25).notNullable().index()
      table.string('ag', 25).notNullable()
      table.string('cc', 25).notNullable()
      table.double('balance').notNullable().defaultTo(0)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
