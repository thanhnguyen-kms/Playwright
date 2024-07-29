import { Locator, Page } from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly usernameTxt: Locator;
    readonly passwordTxt: Locator;
    readonly loginBtn: Locator;
    constructor(page: Page) {
        this.page = page;
        this.usernameTxt = page.getByLabel('Username');
        this.passwordTxt = page.getByLabel('Password');
        this.loginBtn = page.getByRole('button', {name: 'Login'});
    }

    //Go to page
    async gotoUrl(){
        await this.page.goto('https://practice.expandtesting.com/secure#google_vingnette');
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

}
