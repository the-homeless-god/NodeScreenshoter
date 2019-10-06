import { checkParams, sendStatus } from '../tools/server.tool'
import AppConfiguration from '../../../common/tools/config.tool'
import express from 'express'
import { Screenshoter } from '../classes/screenshoter.class'

import fs from 'fs'
const outputDir = 'public/assets/img'

export default class MainRouter {
  private db: any

  private configuration: AppConfiguration

  public constructor(db: any) {
    this.db = db
    this.configuration = AppConfiguration.getInstance()
  }

  generate = async (req: express.Request, res: express.Response) => {
    const { site, selector } = req.body

    if (checkParams(res, [req.body.text, req.body.post])) {
      sendStatus(
        await new Screenshoter(
          fs,
          outputDir,
          site,
          true,
          true,
          selector
        ).parse(),
        res
      )
    }
  }

  index = async (
    req: express.Request,
    res: express.Response,
    option: string
  ) => {
    res.redirect(option)
  }
}
