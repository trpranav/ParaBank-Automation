import { Locator, Page } from "@playwright/test";
import Actions from "./actions";

export default class HomePage extends Actions {
    page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    /**
     * Go to home page of the application
     */
    async gotoHome() {
        await this.page.goto("https://parabank.parasoft.com/parabank/register.htm");
    }

}
