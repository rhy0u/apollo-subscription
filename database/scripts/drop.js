/* eslint-disable no-console */

import { exec } from 'mz/child_process'
import config from 'server/config'
import { wrapDockerCommand } from './utils'

if (config.get('env') === 'production' && process.env.FORCE_SEED !== 'true') {
  console.log(process.env.FORCE_SEED)
  throw new Error('Not in production please!')
}

const command = wrapDockerCommand(
  `dropdb --host postgres --username postgres ${config.get('env')} --if-exists`,
)

exec(`${command}`).catch(err => {
  setTimeout(() => {
    throw err
  })
})
