// Import the necessary modules from the selenium-webdriver package
const { Builder, By, until } = require('selenium-webdriver');

// Define an asynchronous function to test the "Contact Us" button
async function testContactUsButton() {
  // Create a new instance of the Firefox driver
  let driver = await new Builder().forBrowser('firefox').build();

  try {
    // Navigate to the specified URL
    await driver.get("http://127.0.0.1:5500/Planning-Poker/app/MainPage.html");

    // Wait for the "Contact Us" button to be present
    await driver.wait(until.elementLocated(By.id('link-contact')), 10000);

    // Find and click the "Contact Us" button
    await driver.findElement(By.id('link-contact')).click();

    // Other test steps...

  } finally {
    // Close the browser window
    await driver.quit();
  }
}

// Run the test
testContactUsButton().catch(console.error);
