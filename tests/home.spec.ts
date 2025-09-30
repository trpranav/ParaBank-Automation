import { expect } from "@playwright/test";
import { test } from "../fixtures/pageFixtures";
import { registerData } from "../testData/data";

test.use({ storageState: 'auth.json' });

test.describe('Home page automation', () => {
    test(`Verify username "${registerData.firstName[1]}" is visible on the home page `, async ({ page, home }) => {
        await home.gotoHomePage();
        await expect(home.welcomeUserText).toContainText(registerData.firstName[1]);
    })
})