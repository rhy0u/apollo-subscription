const KNEX_TABLES = ['knex_migrations', 'knex_migrations_lock']

let truncateQuery

const getTruncateQuery = async knex => {
  if (!truncateQuery) {
    const result = await knex.schema.raw(
      "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'",
    )

    const tables = result.rows.reduce(
      (acc, { tablename }) =>
        KNEX_TABLES.includes(tablename) ? acc : [...acc, tablename],
      [],
    )

    truncateQuery = tables
      .map(table => `TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`)
      .join(';')
  }

  return truncateQuery
}

export const truncateAll = async knex => {
  const query = await getTruncateQuery(knex)
  return knex.schema.raw(query)
}
