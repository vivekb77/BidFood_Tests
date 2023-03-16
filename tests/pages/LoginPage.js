const { expect } = require("@playwright/test");


exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.idLocator = page.getByPlaceholder('Login ID');
    this.passwordLocator = page.getByPlaceholder('Password');
    this.loginBtnLocator = page.getByRole('button', { name: 'Log In' });

  } 
 
  async login(url,id,password) {

    await this.page.goto(url);

    await this.idLocator.click();
    await this.idLocator.fill(id);
    await this.passwordLocator.click();
    await this.passwordLocator.fill(password);
    await this.loginBtnLocator.click();

  }

  //check if login is successful and user is redirencted to home page
  async verifyPageTitle(pageTitle) {
    await expect(this.page).toHaveTitle(pageTitle);
  }

};
