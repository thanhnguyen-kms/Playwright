import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginsession5.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { Checkout1Page } from '../pages/checkout1.page';
import { Checkout2Page } from '../pages/checkout2.page';
import { CompletedPage } from '../pages/complete.page';

test('TC001 - Verify error message appear when login with invalid user', async ({ page }) => {
    const loginPage = new LoginPage(page);
   
    await test.step('Login with locked out user', async () =>{
        await loginPage.gotoUrl();
        await loginPage.inputUserNameAndPassword('locked_out_user', 'secret_sauce')
        await loginPage.clickLoginBtn();
    })

    //Verify error msg
    await test.step('Verify the error msg', async () =>{  
        await loginPage.verifyLoginError();
    })
})

test('TC002 - Verify user can order product successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await test.step('Login with valid user', async () =>{
        await loginPage.gotoUrl();
        await loginPage.inputUserNameAndPassword('standard_user', 'secret_sauce')
        await loginPage.clickLoginBtn();
    })

    //click Add To Cart
    await test.step('Add an item in cart', async () =>{
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.clickAddToCart();
        await inventoryPage.clickCartLink();
    })

    //click on the cart
    await test.step('Click checkout', async () =>{
        const cartPage = new CartPage(page);
        await cartPage.clickCheckOut();
        
    })

    //input customer information and click Continue
    await test.step('Input customer information', async () =>{
        const checkout1Page = new Checkout1Page(page);
        await checkout1Page.inputCustomerInfor('Thanh', 'Nguyen', '12345')
        await checkout1Page.clickContinue();
        
    })

    //click on the Finish btn
    await test.step('Click Finish', async () =>{
        const checkout2Page = new Checkout2Page(page);
        await checkout2Page.verifyTileExist();
        await checkout2Page.clickFinish();
    })

    //Verify the messga eon the complete screen
    await test.step('Verify the meaase when customer completed to buy an item', async () =>{
        const completePage = new CompletedPage(page);
        await completePage.verifyFirstMsg();
        await completePage.verifySecondMsg();
    })

})

