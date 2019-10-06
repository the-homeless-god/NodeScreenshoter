import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
import Box from '../../../common/classes/box.class'

export const setupGraphql = (app: any) => {
  var schema = buildSchema(`
      ${Box.getGraphSchema()}
    `)

  var root = {
    hello: () => {
      return 'Hello world!'
    }
  }

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    })
  )
}
