import path from 'path'
import express from 'express'
import config from 'server/config'
import react from 'server/middlewares/react'
import apolloServer from 'server/graphql/apolloServer'
import { connect as connectDatabase } from 'server/services/database'
import http from 'http'

const app = express()

app.use(express.static(path.resolve(__dirname, '../../public')))

apolloServer.applyMiddleware({ app })

app.use(react)
const httpServer = http.createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen(config.get('server.port'), () => {
  /* eslint-disable no-console */
  connectDatabase()
  console.log(`🔥 server is listening on port ${config.get('server.port')}
  ${config.get('server.externalUrl')}:${config.get('server.port')}`)
})
