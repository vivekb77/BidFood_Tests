const { expect } = require("@playwright/test");
const  Creds  = require("../../data/login.json");
const  BaseURL = require("../../data/base.json");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.idLocator = page.getByPlaceholder('Login ID');
    this.passwordLocator = page.getByPlaceholder('Password');
    this.loginBtnLocator = page.getByRole('button', { name: 'Log In' });

  } 
 
  async login() {

    await this.page.goto(BaseURL.baseurl);

    await this.idLocator.click();
    await this.idLocator.fill(Creds.credentials.id);
    await this.passwordLocator.click();
    await this.passwordLocator.fill(Creds.credentials.password);
    await this.loginBtnLocator.click();

  }

  //check if login is successful and user is redirencted to home page
  async pageTitle() {
    await expect(this.page).toHaveTitle("myBidfood");
  }

};
