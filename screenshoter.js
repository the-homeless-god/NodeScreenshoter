// References to external libraries
// puppeteer - headless browser based on Chromium
// fs - file storage manager
const puppeteer = require('puppeteer')
const fs = require('fs')

// Configuration of screenshoter
// siteUrl - site that you want to parse
// dir - the output directory that will contains screenshots
const siteUrl = 'http://example.com'
const dir = './screens'

// Checking that directory exist else will create by path
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

// Helper-function to check that element contain empty axises such as X or Y
const isEmptyAxises = (box) => {
  return !box.x || !box.y
}

// Helper-function to check that element contain empty sizes such as width or height
const isEmptySizes = (box) => {
  return !box.width || box.width === 0 || !box.height || box.height === 0
}

// Log before start
console.log('start for', siteUrl)

// Self-executed async function
;(async () => {
  // Make a new Chrome window
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--hide-scrollbars', '--mute-audio', '--disable-gpu'],
  })

  // Make a new Chrome page
  const page = await browser.newPage()

  // Navigate to site url from configuration
  await page.goto(siteUrl, { waitUntil: 'load' })

  // Get a list of all elements - same as document.querySelectorAll('*')
  const elements = await page.$$('*')

  // Log about nodes count at page
  console.log('count of nodes: ', elements.length)

  // Count of parsed and non-parsed nodes
  let done = 0
  let hidden = 0

  // Loop through all elements on page
  for (let i = 0; i < elements.length; i++) {
    try {
      // Getting of sizes of element before parse
      const box = await elements[i].boundingBox()

      // This checking means that user can't see element on page
      if (!box || isEmptyAxises(box) || isEmptySizes(box)) {
        // Increase hidden-counter
        hidden++
      } else {
        // Make a screenshot and place to output directory
        await elements[i].screenshot({
          path: `screens/${('0000' + i).slice(-5)}.png`,
        })

        // Increase done-counter
        done++
      }
    } catch (e) {
      // Increase hidden-counter
      hidden++
    }
  }

  // Log about end with statistic
  console.log('done: ', done)
  console.log('hidden:', hidden)
  console.log('end')

  // Close instance of Chrome
  await browser.close()
})()
