// @ts-check
const { test, expect } = require("@playwright/test");
const { SearchPage } = require("../pages/SearchPage");
const { LoginPage } = require("../pages/LoginPage");
const Products = require("../../data/products.json");
const  Creds  = require("../../data/login.json");
const  BaseURL = require("../../data/base.json");

test.describe("Search Products Tests", () => {
  test.beforeEach(async ({ page }) => {

    //before each test login to the application and verify if login is successful
    const loginPage = new LoginPage(page);
    await loginPage.login(BaseURL.baseurl,Creds.credentials.id, Creds.credentials.password);
    await loginPage.verifyPageTitle(Creds.credentials.pageTitle);
  });

  //test 1
  //Create UI test that search for keyword "cheese" and assert the result for "CHEESE BLUE DANISH (APP 3KG)" shows up in result page. If you can’t find it in first page you can try search with “CHEESE BLUE DANISH (APP 3KG)”

  test("Verify UI test that search for keyword cheese and assert the name", async ({page,}) => {
    const searchPage = new SearchPage(page);

    //search for "cheese" and assert the product name
    await searchPage.searchProduct(Products.searchitem1);
    await searchPage.assertProductDetails(Products.searchitem2);

    // await searchPage.searchProduct(Products.searchitem1);
    // await searchPage.assertProductDetails(Products.searchitem2);

  });


//test 2
//Create UI test that search for keyword “160640” and add " CHEESE BLUE DANISH (APP 3KG) " to basket and assert the result to confirm product added to basket.

  test("Verify UI test that search for keyword 160640 and add to basket", async ({
    page,
  }) => {
    const searchPage = new SearchPage(page);

    //clear basket if any items are present first
    await searchPage.clearBasket();
    //search for "160640" and add to basket
    await searchPage.searchProduct(Products.searchitem3);
    await searchPage.addProductToBasket();
    //assert basket item for name, code and price with expected values
    await searchPage.assertBasketItems(Products.searchitem2, Products.searchitem3, Products.price,Products.quantity);

  });

});
