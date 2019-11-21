import { ApolloClient } from 'apollo-client'

import { InMemoryCache } from 'apollo-cache-inmemory'

import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const GRAPHQL_ENDPOINT = 'ws://localhost:8000/graphql'

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
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
