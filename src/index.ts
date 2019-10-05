import fs from 'fs'
import { Screenshoter } from './classes/screenshoter.class'

;async () => {
  const outputFolder = 'screens/'
  const siteUrl = 'http://google.com'

  const screenshoter = new Screenshoter(fs, outputFolder, siteUrl)
  await screenshoter.parse()
}
