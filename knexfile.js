/* eslint-disable global-require */
const fs = require('fs')
const path = require('path')

const workers = 3
const maxConnectionsAllowed = 20
const freeConnectionsForThierdTools = 2

const config = {
  knexScripts: {
    docker: process.env.CI !== 'true',
  },
  development: {
    debug: false,
    client: 'postgresql',
    connection: {
      user: 'postgres',
      database: 'development',
      timezone: 'utc',
    },
    seeds: {
      directory: './database/seeds',
    },
    migrations: {
      directory: './database/migrations',
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      user: 'postgres',
      database: 'test',
      timezone: 'utc',
    },
    migrations: {
      directory: './database/migrations',
    },
  },
  production: {
    client: 'postgresql',
    pool: {
      min: 2,
      max: Math.floor(
        (maxConnectionsAllowed - freeConnectionsForThierdTools) / workers,
      ),
    },
    seeds: {
      directory: './database/seeds',
    },
    migrations: {
      directory: './database/migrations',
    },
  },
}

if (process.env.DATABASE_URL) {
  const url = require('url')
  const pgProd = url.parse(process.env.DATABASE_URL)

  config.production.connection = {
    host: pgProd.hostname,
    port: pgProd.port,
    user: pgProd.auth.split(':')[0],
    password: pgProd.auth.split(':')[1],
    database: pgProd.path.substring(1),
    ssl: true,
    timezone: 'utc',
  }
}

const LOCAL_CONFIG_PATH = path.join(__dirname, 'config.json')

if (fs.existsSync(LOCAL_CONFIG_PATH)) {
  // eslint-disable-next-line
  const localConfig = require(LOCAL_CONFIG_PATH)
  config[process.env.NODE_ENV || 'development'] = localConfig.dbConfig
}

module.exports = config
