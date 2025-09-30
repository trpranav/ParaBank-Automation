import { Locator, Page } from "@playwright/test";
import Actions from "./actions";

/**
 * Page Object Model for the Parabank Home Page.
 */
export default class HomePage extends Actions {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly welcomeUserText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.welcomeMessage = this.page.locator("#rightPanel > .title");
    this.welcomeUserText = this.page.locator("#leftPanel > .smallText");
  }

  /**
   * Navigate directly to the Parabank Home/Overview page.
   */
  async gotoHomePage(): Promise<void> {
    await this.page.goto(
      "https://parabank.parasoft.com/parabank/overview.htm"
    );
  }

  /**
   * Verify that the Home Page is displayed by checking
   * the visibility of the welcome user text.
   *
   * @returns {Promise<boolean>} true if the page is displayed, false otherwise
   */
  async isHomePageDisplayed(): Promise<boolean> {
    await this.waitForElementToBeDisplayed(this.welcomeUserText);
    return this.welcomeUserText.isVisible();
  }

  /**
   * Get the welcome message text from the right panel.
   *
   * @returns {Promise<string>} the welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    return this.welcomeMessage.textContent() as Promise<string>;
  }
}
