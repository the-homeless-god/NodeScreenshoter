import { log, isNonEmptyList } from '../../../common/tools/common.tool'

import cors from 'cors'
import morgan from 'morgan'
import express from 'express'

import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
import Box from '../../../common/classes/box.class'

export const normalizePort = (val: string) => {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

export const initModules = (app: any) => {
  //! move it
  // Construct a schema, using GraphQL schema language
  var schema = buildSchema(`
    ${Box.getGraphSchema()}
  `)

  // The root provides a resolver function for each API endpoint
  var root = {
    hello: () => {
      return 'Hello world!'
    }
  }

  app.use(morgan('combined'))
  app.use(cors())
  app.use(express.static('public'))

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    })
  )
}

export const handleAppErrors = (app: any) => {
  app.use((req: any, res: any, next: any) => {
    var err = new Error('Not Found')
    next(err)
  })

  app.use((err: any, req: any, res: any, next: any) => {
    res.locals.message = err.message
    res.locals.error = {}
    res.status(err.status || 500)
    res.json(err)
    console.log(err, next)
  })
}

export const handleServerErrors = (server: any) => {
  const onListening = (server: any) => {
    var addr = server.address()
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

    log(`server listen at ${bind}`)
  }

  server.on('listening', () => onListening(server))
}

export const checkParams = (res: any, params: any[]) => {
  let output = isNonEmptyList(params)

  if (!output) {
    res.sendStatus(503)
  }

  return output
}

export function sendStatus(callback: any, res: any) {
  res.send(callback)
}
