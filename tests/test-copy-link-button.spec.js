// playwright

const { test, expect } = require('@playwright/test');
const {MainPage} = require("./pages/main-page");

test.describe("copy link button", () => {
    let mainPage;
    
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.goto();
    });

    test("should copy invite link to clipboard", async () => {
       await mainPage.copyLink();
       const expected = await mainPage.inviteLink.inputValue();
       const actual = await mainPage.getClipboard();
       expect(actual).toBe(expected);
    });

});
