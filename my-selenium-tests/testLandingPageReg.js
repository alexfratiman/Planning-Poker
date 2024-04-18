const { Builder, By, until } = require('selenium-webdriver');

describe('User Registration Test', function() {
  let driver;

  before(async function() {
    this.timeout(0); // Disable Mocha's timeout because creating a WebDriver instance can take time
    driver = await new Builder().forBrowser('firefox').build(); // Create a new WebDriver instance for Firefox
  });

  after(async function() {
    this.timeout(0); // Disable Mocha's timeout because quitting a WebDriver instance can take time
    await driver.quit(); // Quit the WebDriver instance
  });

  it('should display error message when username is empty', async function() {
    this.timeout(20000); // Increase Mocha's timeout for this test case

    try {
      // Navigate to the landing page
      await driver.get('http://127.0.0.1:5500/Planning-Poker/app/LandingPage.html');

      // Wait for the "GO!" button to be clickable
      const startButton = await driver.wait(until.elementLocated(By.css('[id="start-button"]')), 15000);
      await driver.wait(until.elementIsEnabled(startButton), 5000); // Wait for the button to be clickable

      // Click the "GO!" button without entering a username
      await startButton.click();

      // Wait for the error message to be displayed
      const errorMessage = await driver.wait(until.elementLocated(By.css('[id="usernameError"]')), 5000);
      console.log('Error message for empty username displayed successfully');
    } catch (error) {
      throw new Error('Error displaying error message for empty username: ' + error.message);
    }
  });

  it('should display error message when username exceeds 12 characters', async function() {
    this.timeout(20000); // Increase Mocha's timeout for this test case

    try {
      // Navigate to the landing page
      await driver.get('http://127.0.0.1:5500/Planning-Poker/app/LandingPage.html');

      // Wait for the "GO!" button to be clickable
      const startButton = await driver.wait(until.elementLocated(By.css('[id="start-button"]')), 15000);
      await driver.wait(until.elementIsEnabled(startButton), 5000); // Wait for the button to be clickable

      // Enter a long username
      const usernameInput = await driver.wait(until.elementLocated(By.css('[id="name"]')), 5000);
      await usernameInput.sendKeys('testuser1234567890');

      // Click the "GO!" button
      await startButton.click();

      // Wait for the error message to be displayed
      const errorMessage = await driver.wait(until.elementLocated(By.css('[id="usernameError"]')), 5000);
      console.log('Error message for long username displayed successfully');
    } catch (error) {
      throw new Error('Error displaying error message for long username: ' + error.message);
    }
  });
});
