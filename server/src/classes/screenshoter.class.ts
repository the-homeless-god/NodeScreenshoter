import puppeteer from 'puppeteer'

import Log from '../../../common/enums/log.enum'
import Box from '../../../common/classes/box.class'
import { Dictionary } from '../tools/dictionary.tool'
import Common from '../../../common/tools/common.tool'

export class Screenshoter {
  url: string
  outputPath: string
  fs: any
  isOutputValidated: boolean
  isLogEnabled: boolean
  selector: string

  constructor(
    fs: any,
    outputPath: string,
    url: string,
    isOutputValidated: boolean = true,
    isLogEnabled: boolean = true,
    selector: string = '*'
  ) {
    this.fs = fs
    this.outputPath = outputPath
    this.url = url
    this.isOutputValidated = isOutputValidated
    this.isLogEnabled = isLogEnabled
    this.selector = selector
  }

  public parse = async (): Promise<Box[]> => {
    this.log(Log.start, this.url)

    const browser = await this.launchBrowser()
    // receive the browser page
    const page = await this.getPage(browser)

    // get all page elements - same as document.querySelectorAll('*')
    const elements = await page.$$(this.selector)
    const output = await this.screenshotElements(elements)

    this.log(Log.count, elements.length)

    await browser.close()

    return output
  }

  private checkOrCreateOutput = (path: string) => {
    if (!this.fs.existsSync(path)) this.fs.mkdirSync(path)
  }

  private log = (type: Log, param: string = '') => {
    if (this.isLogEnabled) {
      console.log(`${type}: ${param}`)
    }
  }

  private launchBrowser = async () => {
    // launch browser
    const browser = await puppeteer.launch({
      headless: false,
      args: Dictionary.defaultBrowserArgs
    })

    return browser
  }

  private getPage = async (browser: any) => {
    // make the new empty page
    const page = await browser.newPage()

    // navigate to provided url
    await page.goto(this.url, { waitUntil: Dictionary.defaultWaitPageUntil })

    return page
  }

  private screenshotElements = async (elements: any[]): Promise<Box[]> => {
    var done = 0
    var hidden = 0
    var output: Box[] = []

    for (let i = 0; i < elements.length; i++) {
      try {
        const box = await elements[i].boundingBox()

        if (new Box(box || Box.generateBox()).isValidated) {
          const outputBox = new Box(box)
          outputBox.path = `${Common.hash(this.url)}/${('0000' + i).slice(
            -5
          )}.png`

          let path = `${this.outputPath}/${Common.hash(this.url)}`

          // check thath folder exists or create
          if (this.isOutputValidated) this.checkOrCreateOutput(path)

          await elements[i].screenshot({
            path: `${this.outputPath}/${outputBox.path}`
          })

          done++

          output.push(outputBox)
        } else hidden++
      } catch (e) {
        this.log(Log.error, e)
        hidden++
      }
    }

    this.log(Log.done, done.toString())
    this.log(Log.hidden, hidden.toString())
    this.log(Log.end)

    return output
  }
}
