import { Locator, Page } from '@playwright/test';

export class HomePage{
    readonly page: Page;
    readonly loggedLbl: Locator;
    constructor(page: Page){
        this.page = page;
        this.loggedLbl = page.locator('b');
    }

    //Get content of Logger Label
    async getLoggerLabelContent(){
        let content = await this.loggedLbl.textContent();
        return content;
    }
}