import { Locator, Page } from "@playwright/test";
import Actions from "./actions";

export default class RegisterPage extends Actions {
  readonly page: Page;
  readonly logo: Locator;
  readonly title: Locator;
  readonly footerElement: Locator;
  readonly leftMenuElement: Locator;
  readonly rightMenuElement: Locator;
  readonly inputField: Locator;
  readonly registerButton: Locator;
  readonly loginButton: Locator;
  readonly copyrightText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.logo = page.locator('#topPanel>a>img[class="admin"]');
    this.title = page.locator('#rightPanel>h1[class="title"]');
    this.footerElement = page.locator('#footerPanel a');
    this.leftMenuElement = page.locator('#headerPanel> ul[class="leftmenu"]>li');
    this.rightMenuElement = page.locator('#headerPanel> ul[class="button"]>li');
    this.inputField = page.locator('input');
    this.registerButton = page.locator('input[value="Register"]');
    this.loginButton = page.locator('input[value="Log In"]');
    this.copyrightText = page.locator('#footerPanel .copyright');
  }

  /**
   * Navigates to the registration page.
   */
  async gotoRegister() {
    await this.page.goto("https://parabank.parasoft.com/parabank/register.htm");
  }

  /**
   * Checks if a footer element is enabled.
   * @param element - Footer element text
   * @returns Locator for the footer element
   */
  isFooterElementEnabled(element: string) {
    return this.footerElement.getByText(`${element}`);
  }

  /**
   * Checks if a left menu item is enabled.
   * @param element - Menu item text
   * @returns true if enabled, false otherwise
   */
  async isLeftMenuEnabled(element: string) {
    const leftMenuElement = this.leftMenuElement.getByText(element);
    await this.waitForElementToBeEnabled(leftMenuElement);
    return await leftMenuElement.isEnabled();
  }

  /**
   * Checks if a right menu item is enabled.
   * @param element - Menu item text
   * @returns true if enabled, false otherwise
   */
  async isRightMenuEnabled(element: string) {
    const rightMenuElement = this.rightMenuElement.getByText(element);
    await this.waitForElementToBeEnabled(rightMenuElement);
    return await rightMenuElement.isEnabled();
  }

  /**
   * Verifies if an input field is enabled.
   * @param inputId - The field’s ID attribute
   * @returns true if enabled, false otherwise
   */
  async isInputFieldEnabled(inputId: string) {
    const inputFieldLocator: Locator = this.page.locator(`#${inputId.replace(/\./g, '\\.')}`);
    await this.waitForElementToBeEnabled(inputFieldLocator);
    return await inputFieldLocator.isEnabled();
  }

  /**
   * Verifies if a value entered in an input field is correctly displayed.
   * @param inputId - The field’s ID attribute
   * @returns The value currently present in the input field
   */
  async verifyRegisterFieldValues(inputId: string, inputData: string) {
    const inputLocator: Locator = this.page.locator(`#${inputId.replace(/\./g, '\\.')}`);
    await this.waitForElementToBeDisplayed(inputLocator);
    await this.typeText(inputLocator, inputData, `${inputId.split('.').pop()}`)
    const value = await inputLocator.inputValue();
    console.log(value)
    // await this.page.waitForTimeout(4000)
    return value;
  }

  /**
   * Verifies if a value entered in a login input field is correctly displayed.
   * Types the provided data into the field and then reads the current value.
   * @param inputName - The name attribute of the login input field
   * @param inputData - The data to type into the input field
   * @returns The current value present in the input field, which can be used for assertions
   */
  async verifyLoginFieldValues(inputName: string, inputData: string) {
    const inputLocator: Locator = this.page.locator(`.login input[name="${inputName}"]`);
    await this.waitForElementToBeDisplayed(inputLocator);
    await this.typeText(inputLocator, inputData, `${inputName.split('.').pop()}`)
    const value = await inputLocator.inputValue();
    console.log(value)
    return value;
  }

  /**
   * Types data into a registration input field.
   * @param inputId - Input field ID
   * @param inputData - Data to type
   */
  async registerUser(inputId: string, inputData: string) {
    await this.typeText(this.page.locator(`#${inputId.replace(/\./g, '\\.')}`), inputData, `${inputId.split('.').pop()}`)
  }

  /**
   * Checks if a validation message is visible for a field.
   * @param errorId - ID of the error element
   * @returns true if visible, false otherwise
   */
  async isValidationMessageExist(errorId: string) {
    const locatorCombined: Locator = this.page.locator(`#${errorId.replace(/\./g, '\\.')}\\.errors`);
    await this.waitForElementToBeDisplayed(locatorCombined);
    return await locatorCombined.isVisible();
  }

  /**
   * Verifies if the copyright section is displayed.
   * @returns true if visible, false otherwise
   */
  async isCopyrightDisplayed() {
    await this.waitForElementToBeDisplayed(this.copyrightText);
    return this.copyrightText.isVisible();
  }

  /**
   * Checks if a login input field is enabled.
   * @param inputName - name attribute of the login field
   * @returns true if enabled, false otherwise
   */
  async isLoginInputFieldEnabled(inputName: string) {
    const loginInputField = this.page.locator(`.login input[name="${inputName}"]`)
    await this.waitForElementToBeEnabled(loginInputField);
    return await loginInputField.isEnabled();
  }

  /**
   * Fills login form with given data.
   * @param inputName - name attribute of the login field
   * @param inputData - Data to type
   */
  async fillLogInForm(inputName: string, inputData: string) {
    return await this.typeText(this.page.locator(`.login input[name="${inputName}"]`), inputData, `${inputName}`)
  }

  /**
   * Clicks the login button.
   * @param buttonName - Button display name
   */
  async clickLoginButton(buttonName: string) {
    await this.clickButton(this.loginButton, buttonName);
  }

  /**
   * Clicks the register button.
   * @param buttonName - Button display name
   */
  async clickRegisterButton(buttonName: string) {
    await this.clickButton(this.registerButton, buttonName);
  }

  /**
   * Verifies if the login button is enabled.
   * @returns true if enabled, false otherwise
   */
  async isLoginButtonEnabled() {
    await this.waitForElementToBeEnabled(this.loginButton);
    return await this.loginButton.isEnabled();
  }
}
