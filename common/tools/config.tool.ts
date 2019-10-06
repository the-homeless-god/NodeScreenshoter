import dotenv from 'dotenv'
import process from 'process'
dotenv.config()

class AppConfiguration {
  static getInstance() {
    if (!AppConfiguration.instance) {
      AppConfiguration.instance = new AppConfiguration()
    }
    return AppConfiguration.instance
  }

  private static instance: AppConfiguration

  private constructor() {}

  port = process.env.PORT
  basePage = '/index.html'
  database = {
    successMessage: 'db connection successful',

    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    options: {
      charset: process.env.DB_CHARSET,
      collate: process.env.DB_COLLATE
    },
    table: {
      box: process.env.DB_BOX_TABLE
    },
    dialect: process.env.DB_DIALECT
  }
  domainLink = process.env.DOMAIN_LINK
}

export default AppConfiguration
