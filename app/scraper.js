const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
//chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
const options = new chrome.Options();
options.addArguments('--headless');

// --------------------------------------------
require('dotenv').config();
const express = require('express');
const app = express();
const { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require('cors')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const port = process.env.PORT;

const mongoClient = new MongoClient(process.env.DB_URL)
mongoClient.connect();

const eventsCollection = mongoClient.db('LocalGoodCenter').collection('Events');

// ---------------------------------------------\\

(async function() {
  try {

    const driver = await new Builder()  
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    
    await driver.get('https://www.localgoodcenter.org/events');
    await driver.sleep(20000); // Wait for 20 seconds to allow the page to load
    driver.navigate().refresh(); // refreshes webpage 

    console.log(await driver.getTitle());

    var titleElements = await driver.findElements(By.className('eventlist-title-link')); // WORKS
    var imageElements = await driver.findElements(By.className('eventlist-thumbnail')); // WORKS
    var eventInfoElements = await driver.findElements(By.className('sqs-block html-block sqs-block-html')); // WORKS
    var timeElements = await driver.findElements(By.className('eventlist-meta-item')); //WORKS

    //console.log(await driver.getPageSource());

    // Event info for
    console.log(eventInfoElements);
    for (let element of eventInfoElements) {
      const text = await element.getText();
      console.log(text);
      //await driver.sleep(20000);
    }

    // console.log(titleElements)
    // // Event name for
    // for (let element of titleElements) {
    //   const href = await element.getAttribute('href');
    //   const title = await element.getAttribute('eventlist-title-link');
    //   console.log(`Link: ${href}, Title: ${title}`);
    // }

    console.log(titleElements.length);
    for (let element of titleElements) {
      var title = await element.getText();
      console.log("Title Elements: " + title);
      //await driver.sleep(20000);
    }

    // Image for (KEEP)
    for (let element of imageElements) {
      const src = await element.getAttribute('data-src');
      console.log(`Image source: ${src}`);
    }

    driver.quit();

    for (var i = 0; i < titleElements.length; i++) {
    const newValue = {
      imageURL: imageElements[i],
      eventName: titleElements[i],
      time: "",
      info: eventInfoElements[i],
      dates: "",
      display: "",
      reservationRequired: false,
      formURL: ""
    };
    const query = {};
    eventsCollection.insertOne(newValue);
  }
  
  } finally {
   // await driver.quit();
  }

//  catch(err) {
    // await driver.quit();
  //  }
  }
)
();