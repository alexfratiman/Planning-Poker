// Import the necessary modules from the selenium-webdriver package
const { Builder, By, Key, until } = require('selenium-webdriver');

// Define an asynchronous function to test the "Contact Us" button
async function testContactUsButton() {
  // Create a new instance of the Firefox driver
  let driver = await new Builder().forBrowser('firefox').build();

  try {
    // Navigate to the specified URL
    await driver.get("http://127.0.0.1:5500/app/MainPage.html");

    // Find the "Contact Us" button by its ID and click it
    await driver.findElement(By.id('link-contact')).click();

    // Store the original window handle for future reference
    let originalWindow = await driver.getWindowHandle();

    // Wait until a new window or tab opens
    await driver.wait(async () => (await driver.getAllWindowHandles()).length > 1, 20000);

    // Get all the window handles
    let allWindows = await driver.getAllWindowHandles();

    // Switch to the new window or tab
    allWindows.forEach(async handle => {
      if (handle !== originalWindow) {
        await driver.switchTo().window(handle);
      }
    });

    // Get the title of the new page
    let title = await driver.getTitle();

    // Check if the title of the new page is "Contact Us"
    if (title !== "Contact Us") {
      // If not, throw an error
      throw new Error("Contact form or email client did not open successfully");
    }
  } finally {
    // Close the browser window
    await driver.quit();
  }
}

// Run the test
testContactUsButton().catch(console.error);
