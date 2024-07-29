import { Locator, Page } from '@playwright/test';

export class Checkout1Page{
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]')

    }

    //input information customer
    async inputCustomerInfor(firstName: string, lastName: string, postalCode: string ) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode)
    }

    //click on Continue button
    async clickContinue() {
        await this.continueBtn.click();
    }
}

