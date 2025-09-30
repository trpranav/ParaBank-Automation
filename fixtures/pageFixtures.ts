import { test as base } from "@playwright/test";
import HomePage from "../pages/homePage";
import RegisterPage from "../pages/registerPage";
import Actions from "../pages/actions";

type pages = {
  home: HomePage;
  register: RegisterPage;
};

const testPages = base.extend<pages>({
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  register: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});

export const test = testPages;
