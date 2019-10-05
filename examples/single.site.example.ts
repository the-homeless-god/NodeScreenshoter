import fs from 'fs'
import { Screenshoter } from '../src//classes/screenshoter.class'

export const getSingleSiteScreens = async (
  outputFolder: string = 'screens/',
  siteUrl: string = 'http://google.com',
  selector: '#logo',
  isLog = true,
  checkFolder = true
) => {
  const screenshoter = new Screenshoter(
    fs,
    outputFolder,
    siteUrl,
    checkFolder,
    isLog,
    selector
  )
  await screenshoter.parse()
}
