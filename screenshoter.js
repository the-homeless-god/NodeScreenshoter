const puppeteer = require('puppeteer');
const fs = require('fs').promises; // Use fs.promises for modern async file operations

const siteUrl = 'http://example.com';
const outputDir = './screens';

// Function to create the output directory if it doesn't exist
async function createOutputDirectory() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error(`Error creating output directory: ${error}`);
  }
}

// Function to check if a bounding box is empty
function isBoundingBoxEmpty(box) {
  return !box || box.x === 0 || box.y === 0 || box.width === 0 || box.height === 0;
}

// Self-executed async function for the main logic
(async () => {
  try {
    // Create a new Chrome window
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--hide-scrollbars', '--mute-audio', '--disable-gpu'],
    });

    // Create a new Chrome page
    const page = await browser.newPage();

    // Navigate to the specified site URL
    await page.goto(siteUrl, { waitUntil: 'load' });

    // Get a list of all elements on the page
    const elements = await page.$$('*');

    // Log the count of nodes on the page
    console.log('Count of nodes:', elements.length);

    // Initialize counters for parsed and non-parsed nodes
    let parsedCount = 0;
    let hiddenCount = 0;

    // Loop through all elements on the page
    for (let i = 0; i < elements.length; i++) {
      try {
        // Get the bounding box of the element before parsing
        const box = await elements[i].boundingBox();

        // Check if the element is hidden
        if (isBoundingBoxEmpty(box)) {
          hiddenCount++;
        } else {
          // Make a screenshot and save it to the output directory
          await elements[i].screenshot({
            path: `${outputDir}/${('0000' + i).slice(-5)}.png`,
          });

          parsedCount++;
        }
      } catch (e) {
        hiddenCount++;
      }
    }

    // Log statistics at the end
    console.log('Parsed elements:', parsedCount);
    console.log('Hidden elements:', hiddenCount);
    console.log('Execution completed');

    // Close the Chrome instance
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
