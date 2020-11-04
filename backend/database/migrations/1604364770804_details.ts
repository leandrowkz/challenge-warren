import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Details extends BaseSchema {
  protected tableName = 'details'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.timestamps(true)
      table.string('id', 25).notNullable().index()
      table.string('transaction_id', 25).notNullable().index()
      table.string('bank').nullable()
      table.string('cc').nullable()
      table.string('ag').nullable()
      table.text('barcode').nullable()
      table.string('person_name').nullable()
      table.string('person_document').nullable()
      table.text('description').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
