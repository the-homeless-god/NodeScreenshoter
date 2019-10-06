export default interface Api {
  enabled: Boolean
  path: string
  type: string
  option?: any
  routeCallback: (db: any, req: any, res: any) => void
}
