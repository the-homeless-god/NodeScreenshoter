import Api from '../interfaces/api.interface'
import RequestEnum from '../enums/request.enum'
import RouteEnum from '../enums/route.enum'

export default class Route implements Api {
  constructor(obj: Route) {
    this.enabled = obj.enabled
    this.type = obj.type
    this.path = obj.path
    this.routeCallback = obj.routeCallback
    this.routeEnum = obj.routeEnum
    this.option = obj.option
  }

  enabled: boolean = true
  routeEnum: RouteEnum
  type: RequestEnum
  path: string
  option?: any
  routeCallback: (req: any, res: any, option?: any) => void
}
