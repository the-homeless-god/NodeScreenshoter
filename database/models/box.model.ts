import { INTEGER, STRING } from 'sequelize'

const BoxModel = {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  width: {
    type: INTEGER
  },
  height: {
    type: INTEGER
  },
  x: {
    type: INTEGER
  },
  y: {
    type: INTEGER
  },
  path: {
    type: STRING
  }
}

export default BoxModel
