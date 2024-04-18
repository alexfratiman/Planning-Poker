const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const sinon = require('sinon');
const chai = require('chai');
const { setUsername } = require('../app/index.js');

describe('User Input Validation Test', function() {
    let driver;
  
    before(async function() {
      this.timeout(0); // Disable Mocha's timeout because creating a WebDriver instance can take time
      driver = await new Builder().forBrowser('firefox').build(); // Create a new WebDriver instance for Firefox
    });
  
    after(async function() {
      this.timeout(0); // Disable Mocha's timeout because quitting a WebDriver instance can take time
      await driver.quit(); // Quit the WebDriver instance
    });
  
    it('should set username within the specified length limit', async function() {
      this.timeout(20000); // Increase Mocha's timeout for this test case
  
      try {
        // Navigate to the landing page
        await driver.get('http://127.0.0.1:5500/app/LandingPage.html');
  
        // Wait for the input field to be present
        const usernameInput = await driver.wait(until.elementLocated(By.id('name')), 5000);
  
        // Enter a valid username within the specified length limit
        await usernameInput.sendKeys('testuser');
  
        // Find and click the "GO!" button
        const startButton = await driver.wait(until.elementLocated(By.id('start-button')), 5000);
        await startButton.click();
  
        // Wait for the main page to load
        await driver.wait(until.titleIs('Planning Poker'), 5000);
  
        // Assert that the username is correctly set
        const displayedUsername = await driver.findElement(By.id('link-header-container')).getText();
        expect(displayedUsername).to.equal('Planning Poker');
  
        // Log a success message
        console.log('Username set within the specified length limit successfully');
      } catch (error) {
        // Log an error message if the test fails
        throw new Error('Failed to set username within the specified length limit: ' + error.message);
      }
    });
  });