import AppConfiguration from '../../../common/tools/config.tool'
import { connect } from '../../../database/index'
import MainRouter from '../routes/main.route'

import { log } from '../../../common/tools/common.tool'

import Route from '../../../common/classes/route.class'
import RouteEnum from '../../../common/enums/route.enum'
import RequestEnum from '../../../common/enums/request.enum'

var express = require('express')
var router = express.Router()
var configuration = AppConfiguration.getInstance()

const db = connect()

var mainRouter = new MainRouter(db)

const setupRoute = (route: Route) => {
  if (route.enabled) {
    log(route.path)

    switch (route.type) {
      case RequestEnum.get:
        router.get(route.path, (req: any, res: any) => {
          log(route)
          route.routeCallback(req, res, route.option)
        })
        break

      case RequestEnum.post:
        router.post(route.path, (req: any, res: any) => {
          log(route)
          route.routeCallback(req, res, route.option)
        })
        break
    }
  }
}

setupRoute(
  new Route({
    enabled: true,
    routeEnum: RouteEnum.index,
    type: RequestEnum.get,
    path: RouteEnum.index,
    option: configuration.basePage,
    routeCallback: mainRouter.index
  })
)

setupRoute(
  new Route({
    enabled: true,
    routeEnum: RouteEnum.generate,
    type: RequestEnum.post,
    path: RouteEnum.generate,
    routeCallback: mainRouter.generate
  })
)

export default router
