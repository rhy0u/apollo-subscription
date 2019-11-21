/* eslint-disable no-console */

import config from 'server/config'
import { connect, disconnect } from 'server/services/database'
import { truncateAll } from 'server/utils/database'

if (config.get('env') === 'production' && process.env.FORCE_SEED !== 'true') {
  throw new Error('Not in production please!')
}

const knex = connect()

truncateAll(knex)
  .then(() => {
    disconnect(knex)
    console.log('Database truncated')
  })
  .catch(err => {
    setTimeout(() => {
      throw err
    })
  })
