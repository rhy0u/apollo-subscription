import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

class Message extends BaseModel {
  static tableName = 'messages'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['author', 'text'],
    properties: {
      author: { type: 'string' },
      text: { type: 'string' },
    },
  })

  static relationMappings = {}
}

export default Message
