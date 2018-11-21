const puppeteer = require('puppeteer');
const siteUrl = 'http://example.com';

console.log('start for', siteUrl);

(async () => {
  const browser =  await puppeteer.launch({
    headless: false,
    args: [
      '--hide-scrollbars',
      '--mute-audio',
      '--disable-gpu'
    ]
  });

  const page = await browser.newPage();
 
  await page.goto(siteUrl, {waitUntil:"load"});

  // get a list of all elements - same as document.querySelectorAll('*')
  const elements = await page.$$('*')
  
  console.log('count of nodes: ', elements.length)

  let done = 0;
  let hidden = 0;
  
  for (let i = 0; i <elements.length; i++) {
    try {
       const box = await  elements[i].boundingBox();
       if(box === undefined || box === null || 
          box.x === undefined || box.x === null || box.y === undefined || box.y === null ||
          box.width === undefined || box.width === null || box.width === 0 ||
          box.height === undefined || box.height === null || box.height === 0){
          
          hidden++;
       } 
       else{
         await elements[i].screenshot({path: `screens/${('0000' + i).slice(-5)}.png`});
         done++;
       }
    } catch (e) {
       hidden++;
    }
  }
  console.log('done: ', done);
  console.log('hidden:', hidden);
  console.log('end');
  await browser.close();
})();
