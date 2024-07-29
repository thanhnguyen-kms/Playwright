import { Locator, Page, expect } from '@playwright/test';


export class CompletedPage{
    readonly page: Page;
    readonly msg1: Locator;
    readonly msg2: Locator;

    constructor(page: Page){
        this.page = page;
        this.msg1 = page.locator('[data-test="complete-header"]');
        this.msg2 = page.locator('[data-test="complete-text"]');
    }

    async verifyFirstMsg(){
        const firstMsg = await this.msg1.textContent();
        await expect(firstMsg).toEqual('Thank you for your order!');
    }

    async verifySecondMsg(){
        const secondMsg = await this.msg2.textContent();
        await expect(secondMsg).toEqual('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    }
}