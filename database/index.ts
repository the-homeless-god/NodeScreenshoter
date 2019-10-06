import Sequelize from 'sequelize'
import BoxModel from './models/box.model'
import AppConfiguration from '../common/tools/config.tool'
import { isNonEmptyList } from '../common/tools/common.tool'
var configuration = AppConfiguration.getInstance()

var db = configuration.database

export const connect = () => {
  console.log(`db host: ${db.host}`)
  if (isNonEmptyList([db.name, db.user, db.password, db.table.box])) {
    const sequelize = new Sequelize.Sequelize(db.name!, db.user!, db.password, {
      dialect: 'mysql',
      host: db.host,
      define: {
        timestamps: false
      }
    })
    let opts = db.options

    const Box = sequelize.define(db.table.box!, BoxModel, opts)

    sequelize
      .sync()
      .then((result: any) => console.log(db.successMessage))
      .catch((err: any) => console.log(err))

    return {
      Box: Box
    }
  }

  throw Error
}
