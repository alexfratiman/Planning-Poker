// @ts-check

export class MainPage {
    constructor(page) {
        this.page = page;
        this.copyLinkButton = this.page.locator("#copy-link-button");
        this.inviteLink = this.page.locator("#game-link");
    }

    async goto() {
        await this.page.goto("http://127.0.0.1:5500/app/MainPage.html");
    }

    async copyLink() {
        await this.copyLinkButton.click();
    }

    async getClipboard() {
        return this.page.evaluate("navigator.clipboard.readText()");
    }
}

