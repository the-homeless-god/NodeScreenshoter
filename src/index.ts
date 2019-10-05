import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import { Screenshoter } from '../src//classes/screenshoter.class'

var app = express()
var outputDir = 'public/assets/img'

app.use(bodyParser.json())

app.set('view engine', 'hbs')
app.use(express.static('public'))
var port = 3000

app.post('/generate', async (req: express.Request, res: express.Response) => {
  const { site, selector } = req.body
  const screenshoter = new Screenshoter(
    fs,
    outputDir,
    site,
    true,
    true,
    selector
  )
  const boxElems = await screenshoter.parse()

  res.render(
    'boxes.hbs',
    {
      boxElems: boxElems
    },
    (err, html) => {
      res.json(html)
    }
  )
})

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('input.hbs')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
