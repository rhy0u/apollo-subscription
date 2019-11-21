import Knex from 'knex'
import config from 'server/config'
import { Model, knexSnakeCaseMappers } from 'objection'
import knexConfig from '../../../knexfile'

let knex

export function connect() {
  if (!knex) {
    knex = Knex({ ...knexConfig[config.get('env')], ...knexSnakeCaseMappers() })
  }
  Model.knex(knex)
  return knex
}

export function getKnex() {
  return knex
}

export async function disconnect() {
  return new Promise((resolve, reject) => {
    if (!knex) {
      resolve()
      return
    }

    knex.destroy(error => {
      if (error) {
        reject(error)
      } else {
        knex = null
        resolve()
      }
    })
  })
}
