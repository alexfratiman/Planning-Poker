// Import the necessary modules from the selenium-webdriver package
const { Builder } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

// Define an asynchronous function to test the landing page
async function testLandingPage() {
  // Create a new instance of Firefox Options
  const options = new firefox.Options().setPreference(
    "browser.tabs.remote.autostart",
    false
  );

  // Build a new WebDriver instance for Firefox
  const driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();

  // Navigate to the landing page
  await driver.get("http://127.0.0.1:5500/app/LandingPage.html");

  // Get the title of the current page
  const title = await driver.getTitle();
  // Log the actual title for debugging purposes
  console.log("The actual title is: ", title);

  // Check if the title matches the expected title
  if (title === "Planning Poker") {
    // If the title is correct, log a success message
    console.log("Landing page title is correct");
  } else {
    // If the title is incorrect, log an error message
    console.error("Landing page title is incorrect");
  }

  // Quit the driver after the tests are complete
  await driver.quit();
}

// Call the test function
testLandingPage();
