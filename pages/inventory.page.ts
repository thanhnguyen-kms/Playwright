import { Locator, Page } from '@playwright/test';

export class InventoryPage{
    readonly page: Page;
    readonly addToCart: Locator;
    readonly cartLink: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.addToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');

    }

    //Click on the Add to Cart btn
    async clickAddToCart(){
        await this.addToCart.click();
    }

    //Click on cart
    async clickCartLink(){
        await this.cartLink.click();
    }

}


