import { Locator, Page, expect } from '@playwright/test';

export class Checkout2Page{
    readonly page: Page;
    readonly finishbtn: Locator;
    readonly itemTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.finishbtn = page.locator('[data-test="finish"]');
        this.itemTitle = page.locator('[data-test="inventory-item-name"]')

    }

    //click on Finish btn
    async clickFinish(){
        await this.finishbtn.click();
    }

    async verifyTileExist(){
        await expect(this.itemTitle).toHaveCount(1)
    }
}
