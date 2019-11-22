import { ApolloClient } from 'apollo-client'

import { InMemoryCache } from 'apollo-cache-inmemory'

import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const loc = window.location

const uri = `${loc.protocol === 'https:' ? 'wss:' : 'ws:'}//${loc.host}/graphql`

const client = new SubscriptionClient(uri, {
  reconnect: true,
})

const link = new WebSocketLink(client)

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

export default apolloClient
