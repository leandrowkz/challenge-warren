import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ApiTokens extends BaseSchema {
  protected tableName = 'api_tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      // "useTz: true" utilizes timezone option in PostgreSQL and MSSQL
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('expires_at', { useTz: true }).nullable()

      // Default table columns
      table.increments('id').primary()
      table.string('user_id').index()
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.string('token', 64).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
