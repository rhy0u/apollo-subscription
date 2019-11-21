import { ApolloServer } from 'apollo-server-express'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import config from 'server/config'
import * as Message from './types/Message'

const baseSchema = /* GraphQL */ `
  scalar Date
  scalar DateTime
  type Query {
    ping: Boolean!
  }
  type Mutation {
    ping: Boolean!
  }
  type Subscription {
    ping: Boolean!
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`

const baseResolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Query: {
    ping: () => true,
  },
  Mutation: {
    ping: () => true,
  },
  Subscription: {
    ping: () => true,
  },
}

const buildSchema = (...types) =>
  new ApolloServer({
    typeDefs: [baseSchema, ...types.map(({ schema }) => schema)],
    resolvers: [baseResolvers, ...types.map(({ resolvers }) => resolvers)],
    playground: config.get('server.graphql.playground'),

    formatError: err => {
      /* eslint-disable-next-line no-console */
      console.error(err.message)
      return err
    },
  })

const server = buildSchema(Message)

export default server
