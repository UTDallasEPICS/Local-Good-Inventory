//const { Builder, By, Key, until } = require('selenium-webdriver');
//const chrome = require('selenium-webdriver/chrome');
//const chromedriver = require('chromedriver');
//chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
//const options = new chrome.Options();
//options.addArguments('--headless');

const JSSoup = require('jssoup').default;

// --------------------------------------------
require('dotenv').config();
//const { MongoClient } = require('mongodb');
//const bodyParser = require('body-parser');

const port = process.env.PORT;

//const mongoClient = new MongoClient(process.env.DB_URL)
//mongoClient.connect();

//const eventsCollection = mongoClient.db('LocalGoodCenter').collection('Events');

// ---------------------------------------------\\

async function scrape() {
  try {

    var html = await (await fetch('https://www.localgoodcenter.org/events')).text();
    soup = new JSSoup(html);
    var titleElements = soup.findAll('a', 'eventlist-title-link'); //await driver.findElements(By.className('eventlist-title-link')); // WORKS
    var imageElements = soup.findAll('img', 'eventlist-thumbnail');//await driver.findElements(By.className('eventlist-thumbnail')); // WORKS
    var eventInfoElements = soup.findAll('div', 'sqs-block-html'); //await driver.findElements(By.className('sqs-block html-block sqs-block-html')); // WORKS
    var registrationLinks = soup.findAll('a', 'sqs-block-button-element');
    var timeElements =  soup.findAll('div', 'eventlist-meta-item'); //WORKS
    
    events = []

    for (var i = 0; i < titleElements.length; i++) {
      const newValue = {
        imageURL: imageElements[i].attrs['data-src'],
        eventName: titleElements[i].text,
        time: timeElements[i],
        info: eventInfoElements[i].text,
        dates: "",
        display: true,
        reservationRequired: false,
        formURL: registrationLinks[i].attrs['href']
      };
      events.push(newValue);
    }

    return events;
  } finally {
   // await driver.quit();
  }

//  catch(err) {
    // await driver.quit();
  //  }

}

//scrape();

module.exports = {scrape};