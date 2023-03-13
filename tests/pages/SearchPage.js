const { expect } = require("@playwright/test");

exports.SearchPage = class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchBoxLocator = page.getByRole('textbox', { name: 'Search for a product e.g. butter' });
    this.searchBtnLocator = page.locator('#search-button > .icon').first();
    this.productDetailsLocator = page.locator("//a[contains(text(),'CHEESE BLUE DANISH (APP 3KG)')]");
   
    this.emptyBasketBtnLocator = page.getByRole('link', { name: 'Empty My Basket' });
    this.emptyBasketPopUpOkBtnLocator = page.getByRole('button', { name: 'OK' });

    // this.addToBasketBtnLocator = page.locator("(//span[text()='Add'])[1]");
    this.addToBasketBtnLocator = page.locator("(//button[contains(@class,'btn btn-primary')]//span)[1]");
    this.basketBtnLocator = page.locator("button[ng-show='cartEnabled']");
    this.basketItemLocatorName = page.locator('span.productName.ng-binding.ng-scope');
    this.basketItemLocatorCode = page.locator("(//span[text()='160640'])[2]");
    this.basketItemLocatorQuantity = page.locator("input[name='itemQty']");
    this.basketItemLocatorPrice = page.locator("//span[contains(@class,'item-total ng-binding')]");
    
  } 

 //
  async searchProduct(productName) {
    await this.searchBoxLocator.click();
    await this.searchBoxLocator.fill(productName);
    await this.searchBtnLocator.click();
  }

  async assertProductDetails(productName) {

    await expect.soft(this.productDetailsLocator).toHaveText(productName);

    //if item is found on first page asset the details/name
    if(await this.productDetailsLocator.count() > 0){
        // console.log("Product is available on page 1");
        await expect(this.productDetailsLocator).toHaveText(productName);
    }

    //If you can’t find it in first page you can try search with “CHEESE BLUE DANISH (APP 3KG)”

    if(await this.productDetailsLocator.count() == 0){
        // console.log("Product is not available on page 1");
        await this.searchBoxLocator.click();
        await this.searchBoxLocator.fill(productName);
        await this.searchBtnLocator.click();
        await expect(this.productDetailsLocator).toHaveText(productName);

    }
  }




  async clearBasket() {
    await this.basketBtnLocator.click();

    //Empty the basket if it is not empty
    if(await this.emptyBasketBtnLocator.count()>0){
        // console.log("Basket is not empty");
        await this.emptyBasketBtnLocator.click();
        await this.emptyBasketPopUpOkBtnLocator.click();

    }
    //Click on the basket button if basket is empty to close the side panel
    if(await this.emptyBasketBtnLocator.count()==0){
        // console.log("Basket is empty");
        await this.basketBtnLocator.click();
    }
  }

  async addProductToBasket() {
    await this.addToBasketBtnLocator.click();

  }

  async assertBasketItems(productName,productCode,price) {
    await this.basketBtnLocator.click();
    await expect(this.basketItemLocatorName).toHaveText(productName);
    await expect(this.basketItemLocatorCode).toHaveText(productCode);
    await expect(this.basketItemLocatorQuantity).toHaveValue("1"); 
    await expect(this.basketItemLocatorPrice).toHaveText(price); 
  }

};
