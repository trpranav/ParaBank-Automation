import { expect } from "@playwright/test";
import { test } from "../fixtures/pageFixtures";
import { footerElements, registerData, RegisterData, leftMenuElements, rightMenuElements, loginInputName, loginData, LoginData } from "../testData/data";

test.describe("Parabank Register Page Tests", () => {

  test('TC_001 Heading "Signing up is easy!" is displayed', async ({ register }) => {
    await register.gotoRegister();
    expect(await register.title.innerText(), 'Heading text is displayed as expected')
      .toBe("Signing up is easy!");
  });

  test('TC_002 Logo is visible on the register page', async ({ register }) => {
    await register.gotoRegister();
    await expect(register.logo, 'Logo is visible on the register page').toBeVisible();
  });

  test('TC_003 Footer elements are present and enabled', async ({ register }) => {
    await register.gotoRegister();
    for (let element of footerElements) {
      await expect(register.isFooterElementEnabled(element), `Footer element "${element}" is enabled`)
        .toBeEnabled();
    }
  });

  test('TC_004 All registration input fields are enabled', async ({ register }) => {
    await register.gotoRegister();
    for (let key in registerData) {
      const inputId = registerData[key as keyof RegisterData][0];
      await expect(await register.isInputFieldEnabled(inputId), `Input field "${key}" is enabled`)
        .toBe(true);
    }
  });

  test('TC_005 Entered values are correctly displayed in registration fields', async ({ register }) => {
    await register.gotoRegister();
    for (let key in registerData) {
      const inputId = registerData[key as keyof RegisterData][0];
      const expectedValue = registerData[key as keyof RegisterData][1];
      await expect(
        await register.verifyRegisterFieldValues(inputId, expectedValue),
        `Input field "${key}" contains the expected value "${expectedValue}"`
      ).toBe(expectedValue);
    }
  });

  test('TC_006 Entered values are correctly displayed in login fields', async ({ register }) => {
    await register.gotoRegister();
    for (let key in loginData) {
      const inputName = loginData[key as keyof LoginData][0];
      const expectedValue = loginData[key as keyof LoginData][1];
      await expect(
        await register.verifyLoginFieldValues(inputName, expectedValue),
        `Login field "${key}" contains the expected value "${expectedValue}"`
      ).toBe(expectedValue);
    }
  });

  test('TC_007 Validation messages appear for empty registration fields', async ({ register }) => {
    await register.gotoRegister();
    await register.clickButton(register.registerButton, 'Register');

    for (let key in registerData) {
      const inputId = registerData[key as keyof RegisterData][0];
      await expect(await register.isValidationMessageExist(inputId), `Validation message is displayed for "${key}" field`)
        .toBe(true);
    }
  });

  test('TC_008 User can register successfully', async ({ register, home }) => {
    await register.gotoRegister();
    for (let key in registerData) {
      const inputId = registerData[key as keyof RegisterData][0];
      const inputValue = registerData[key as keyof RegisterData][1];
      await expect(await register.isInputFieldEnabled(inputId), `"${key}" field is enabled`)
        .toBe(true);
      await register.registerUser(inputId, inputValue);
    }
    await register.clickRegisterButton('Register');
    await expect(await home.isHomePageDisplayed(), 'Home page is displayed after registration')
      .toBe(true);
  });

  test('TC_009 Left menu items are enabled', async ({ register }) => {
    await register.gotoRegister();
    for (let element of leftMenuElements) {
      await expect(await register.isLeftMenuEnabled(element), `Left menu item "${element}" is enabled`)
        .toBe(true);
    }
  });

  test('TC_010 Right menu items are enabled', async ({ register }) => {
    await register.gotoRegister();
    for (let element of rightMenuElements) {
      await expect(await register.isRightMenuEnabled(element), `Right menu item "${element}" is enabled`)
        .toBe(true);
    }
  });

  test('TC_011 Footer copyright text is displayed', async ({ register }) => {
    await register.gotoRegister();
    await expect(await register.isCopyrightDisplayed(),
      'Footer copyright text is displayed')
      .toBe(true);
  });

  test('TC_012 Login form fields are enabled', async ({ register }) => {
    await register.gotoRegister();
    for (let value of loginInputName) {
      await expect(await register.isLoginInputFieldEnabled(value), `Login field "${value}" is enabled`)
        .toBe(true);
    }
    await expect(await register.isLoginButtonEnabled(), 'Login button is enabled')
      .toBe(true);
  });

  test('TC_013 User can login successfully from register page', async ({ register, home, page }) => {
    await register.gotoRegister();
    for (let key in loginData) {
      const inputName = loginData[key as keyof LoginData][0];
      const inputValue = loginData[key as keyof LoginData][1];
      await expect(await register.isLoginInputFieldEnabled(inputName), `"${key}" login field is enabled`)
        .toBe(true);
      await register.fillLogInForm(inputName, inputValue);
    }
    await register.clickLoginButton('Login');
    await expect(await home.isHomePageDisplayed(), 'Home page is displayed after login')
      .toBe(true);

    // Save authentication state
    await page.context().storageState({ path: 'auth.json' });
  });

});
