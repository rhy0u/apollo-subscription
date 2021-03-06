import Message from 'server/models/Message'
import { PostgresPubSub } from 'graphql-postgres-subscriptions'
import config from 'server/config'
import knexConfig from '../../../../knexfile'

const pubsub = new PostgresPubSub(knexConfig[config.get('env')].connection)

export const schema = /* GraphQL */ `
  type Message {
    id: ID!
    author: String!
    text: String!
  }
  input MessageInput {
    author: String!
    text: String!
  }
  extend type Query {
    messages(limit: Int): [Message!]!
    message(messageId: ID!): Message!
  }
  extend type Mutation {
    addMessage(message: MessageInput!): Message!
  }
  extend type Subscription {
    addedMessage: Message!
  }
`
export const resolvers = {
  Query: {
    messages: async (object, { limit }) =>
      (
        await Message.query()
          .orderBy('createdAt', 'DESC')
          .modify(builder => {
            if (limit) builder.limit(limit)
          })
      ).reverse(),
    message: async (object, { messageId }) =>
      Message.query().findById(messageId),
  },
  Mutation: {
    addMessage: async (object, { message }) => {
      const addedMessage = await Message.query().insert(message)
      pubsub.publish('pinAdded', { addedMessage })

      return addedMessage
    },
  },
  Subscription: {
    addedMessage: {
      subscribe: () => pubsub.asyncIterator('pinAdded'),
    },
  },
}
