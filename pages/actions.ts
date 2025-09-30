import { expect, Locator, Page } from "@playwright/test";
import { test } from '@playwright/test';
import { error } from "console";

export default class Actions {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForElementToBeEnabled(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: 5000 });
        await expect(locator).toBeEnabled({ timeout: 5000 });
    }

    async waitForElementToBeDisplayed(locator: Locator) {
        await expect(locator).toBeVisible({ timeout: 5000 });
    }

    async clickButton(locator: Locator, friendlyName: string) {
        await this.waitForElementToBeEnabled(locator);
        let logMessage = 'Clicking on button ';
        logMessage = friendlyName ? logMessage + friendlyName : logMessage;
        console.log(logMessage);
        await test.step(logMessage, async () => {
            await locator.click();
        })
    }

    async clickDropDown(locator: Locator, friendlyName: string) {
        await this.waitForElementToBeEnabled(locator);
        let logMessage = 'Clicking on dropdown ';
        logMessage = friendlyName ? logMessage + friendlyName : logMessage;
        console.log(logMessage);
        await test.step(logMessage, async () => {
            await locator.click();
        })
    }

    async clickCheckBox(locator: Locator, friendlyName: string) {
        await this.waitForElementToBeEnabled(locator);
        let logMessage = 'Clicking on checkbox ';
        logMessage = friendlyName ? logMessage + friendlyName : logMessage;
        console.log(logMessage);
        await test.step(logMessage, async () => {
            if (!await locator.isChecked()) {
                console.log('Check box is not checked. Clicking on it...')
                await locator.click();
            }
        })
    }

    async typeText(locator: Locator, valueToEnter: string, friendlyName: string) {
        await this.waitForElementToBeEnabled(locator);
        let logMessage = `Entering value "${valueToEnter}"`;
        console.log(logMessage);
        logMessage = friendlyName ? `${logMessage} for ${friendlyName}` : logMessage;
        await test.step(logMessage, async () => {
            await locator.pressSequentially(valueToEnter);
        })
    }

}
