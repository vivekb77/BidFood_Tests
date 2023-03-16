// @ts-check
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const  Creds  = require("../../data/login.json");
const  BaseURL = require("../../data/base.json");

//Login Tests can be run if needed independently

// test.describe("Login", () => {
//   test.beforeEach(async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.login(BaseURL.baseurl,Creds.credentials.id, Creds.credentials.password);
//   });

//   test("Verify if login is sucessful", async ({ page }) => {
//     const loginPage = new LoginPage(page); 
//     await loginPage.verifyPageTitle(Creds.credentials.pageTitle);
//   });


// });
