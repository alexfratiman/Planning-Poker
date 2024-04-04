const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

async function testCopyInviteLink() {

    // Initialize Firefox WebDriver
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Open the web page
        await driver.get("http://127.0.0.1:5500/app/MainPage.html");

        // Find and click the "Copy Link" button
        await driver.wait(until.elementLocated(By.id('copy-link-button')), 5000);
        let copyLinkButton = await driver.findElement(By.id('copy-link-button'));
        await copyLinkButton.click();

        // Wait for the alert message and verify its text
        let alert = await driver.wait(until.alertIsPresent(), 5000);
        let alertText = await alert.getText();
        if (alertText.includes("Link copied to clipboard!")) {
            console.log("Copy invite link test passed.");
        } else {
            console.log("Copy invite link test failed.");
        }
        await alert.accept(); // Dismiss the alert
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        // Quit the browser
        await driver.quit();
    }
}

// Run the test
testCopyInviteLink();
