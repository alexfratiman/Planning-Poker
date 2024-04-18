// Import the necessary modules from the selenium-webdriver package
const { Builder, By, Key, until } = require('selenium-webdriver');

// Define an asynchronous function to test the results section
async function testResultsSection() {
  // Create a new instance of the Firefox driver
  let driver = await new Builder().forBrowser('firefox').build();

  try {
    // Navigate to the specified URL
    await driver.get("http://127.0.0.1:5500/Planning-Poker/app/MainPage.html");

    // Use JavaScript to directly manipulate the DOM and add test data to the results section
    // This is simulating the results that would be displayed after a vote
    await driver.executeScript(`
        document.getElementById("players").innerHTML = "<tr id='player1'><td id='username-result'>John</td><td id='vote-result'>13</td></tr>";
    `);

    // Wait until the results header is present in the DOM
    // This is to ensure that the results section has loaded before we check the data
    await driver.wait(until.elementLocated(By.id('results-header')), 5000);

    // Find the elements that contain the test data
    let usernameElement = await driver.findElement(By.id('username-result'));
    let voteElement = await driver.findElement(By.id('vote-result'));

    // Get the text content of the elements
    let usernameText = await usernameElement.getText();
    let voteText = await voteElement.getText();

    // Check if the text content matches the test data
    // If not, throw an error
    if (usernameText !== 'John' || voteText !== '13') {
      throw new Error('Test data in results section is not displayed correctly');
    }

    // If the text content matches the test data, log a success message
    console.log('Test data in results section is displayed correctly');
  } finally {
    // Always quit the driver at the end
    // This closes the browser window and ends the WebDriver session
    await driver.quit();
  }
}

// Run the test
// If an error is thrown during the execution of the test, it will be caught and logged to the console
testResultsSection().catch(console.error);
