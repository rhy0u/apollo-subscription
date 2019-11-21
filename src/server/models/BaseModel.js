import { Model } from 'objection'

export function mergeSchemas(...schemas) {
  return schemas.reduce(
    (mergedSchema, schema) => ({
      ...mergedSchema,
      ...schema,
      required: [...mergedSchema.required, ...schema.required],
      properties: {
        ...mergedSchema.properties,
        ...schema.properties,
      },
    }),
    {
      required: [],
      properties: {},
    },
  )
}

export default class BaseModel extends Model {
  // Uses http://json-schema.org/latest/json-schema-validation.html
  static jsonSchema = {
    type: 'object',
    required: [],
    properties: {
      id: { type: ['integer', 'string'] },
      createdAt: { type: 'date' },
      updatedAt: { type: 'date' },
    },
  }

  // Centralize the models.
  static modelPaths = [__dirname]

  // Used by objection-rest
  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }
}
