import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.timestamps(true)
      table.string('id', 25).notNullable().index()
      table.string('user_id', 25).notNullable().index()
      table.dateTime('when').notNullable()
      table.string('type').notNullable() // deposit, withdraw, payment
      table.double('amount').notNullable().defaultTo(0)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
