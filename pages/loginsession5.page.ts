import { Locator, Page, expect } from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly usernameTxt: Locator;
    readonly passwordTxt: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameTxt = page.locator('[data-test="username"]');
        this.passwordTxt = page.locator('[data-test="password"]');
        this.loginBtn = page.getByRole('button', {name: 'Login'});
    }
    //Go to page
    async gotoUrl(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    //input user name and password
    async inputUserNameAndPassword(username: string, password: string) {
        await this.usernameTxt.fill(username);
        await this.passwordTxt.fill(password);
    }

    //click on Login button
    async clickLoginBtn() {
        await this.loginBtn.click();
    }

    async verifyLoginError(){
        const contentLoggerLbl = await this.page.locator('[data-test="error"]').textContent();
        expect(contentLoggerLbl).toEqual('Epic sadface: Sorry, this user has been locked out.')
    }

}