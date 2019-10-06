import express from 'express'
const all_routes = require('express-list-endpoints')

import AppConfiguration from '../../common/tools/config.tool'
var configuration = AppConfiguration.getInstance()

import { createServer } from 'http'
import bodyParser from 'body-parser'

import {
  initModules,
  normalizePort,
  handleAppErrors,
  handleServerErrors
} from './tools/server.tool'

import router from './tools/router.tool'

var app = express()

const port = normalizePort(configuration.port || '3000')

app.set('port', port)

app.use(bodyParser.json())

app.use('/', router)

console.log(all_routes(app))

initModules(app)
handleAppErrors(app)

var server = createServer(app)
handleServerErrors(server)

server.listen(port)
