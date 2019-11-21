exports.up = async knex =>
  knex.schema.createTable('messages', table => {
    table.bigIncrements('id').primary()
    table.string('author').notNull()
    table.text('text').notNull()
    table.timestamps(false, true)
  })

exports.down = async knex => knex.schema.dropTableIfExists('messages')
