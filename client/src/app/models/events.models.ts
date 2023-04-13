export interface Event{
    imageURL: string,
    eventName: string,
    time: string,
    info: string,
    dates: string[]

    
}

const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.addArguments('--headless');

const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

(async function() {
  try {
    await driver.get('https://www.localgoodcenter.org/events');
    await driver.sleep(5000); // Wait for 5 seconds to allow the page to load

    const titleElements = await driver.findElements(By.xpath('//a[@href and @eventlist-title-link]')); // Event name
    const imageElements = await driver.findElements(By.xpath('//img[@data-src and @eventlist-thumbnail]')); // Image

    // Event name for
    for (let element of titleElements) {
      const href = await element.getAttribute('href');
      const title = await element.getAttribute('eventlist-title-link');
      console.log(`Link: ${href}, Title: ${title}`);
    }

    // Image for
    for (let element of imageElements) {
      const src = await element.getAttribute('data-src');
      console.log(`Image source: ${src}`);
    }

  } finally {
    await driver.quit();
  }
})();
