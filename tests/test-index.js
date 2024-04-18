const assert = require('assert');
const{Builder, By} =  require("selenium-webdriver");

async function goButtonTest() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://127.0.0.1:5500/app/LandingPage.html");
    await driver.findElement(By.id("name")).sendKeys('test');
    await driver.findElement(By.id("start-button")).click();
    let currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, "http://127.0.0.1:5500/app/MainPage.html", "Not being taken to main page after pressing go");
    driver.close();
}

async function usernameValidityTest() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://127.0.0.1:5500/app/LandingPage.html");
    await driver.findElement(By.id("start-button")).click();
    let visibility = await driver.findElement(By.id("usernameError")).getCssValue("visibility");
    assert.equal(visibility, "visible", "Username validity filter not working");
    driver.close();
}

async function cardSelectionTest() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://127.0.0.1:5500/app/MainPage.html");
    await driver.findElement(By.className("item1")).click();
    let element = await driver.findElement(By.id('card1'));
    let classAttribute = await element.getAttribute('class');
    assert(classAttribute.includes("selected"), "Card is not selected");
    driver.close();
}


async function cardDeselectionTest() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://127.0.0.1:5500/app/MainPage.html");
    await driver.findElement(By.className("item1")).click();
    await driver.findElement(By.className("item2")).click();
    let element = await driver.findElement(By.id('card1'));
    let classAttribute = await element.getAttribute('class');
    assert(!classAttribute.includes("selected"), "Card is not deselected");
    driver.close();
}


async function runTests() {
    await goButtonTest();
    await usernameValidityTest();
    await cardSelectionTest();
    await cardDeselectionTest();
}

runTests();