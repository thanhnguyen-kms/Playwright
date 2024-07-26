import { test, expect } from '@playwright/test';
   
//call the auth 
test.use({ storageState: 'playwright/.auth/user.json' });

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html/');
})

test('TC001 - Verify sort by price', async ({ page }) => {
    //Validate the "Products" is visible
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
    //Validate the sort function
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi')
    const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const priceValues = prices.map(price => parseFloat(price.replace('$', '')));
    for (let index = 0; index <priceValues.length -1 ; index++) {
        if (priceValues[index+1]) {
            expect(priceValues[index]).toBeLessThanOrEqual(priceValues[index+1]);
        }
    }
});

test('TC002 - Verify user can order product', async ({ page }) => {
    /*There are some steps that is got the supporting from chatGPT*/
    // Click "Add to cart" on the first item
    await page.click('.inventory_item:first-child .btn_inventory');

    // Verify the button text changed into "Remove" and there is number '1' on the cart
    const buttonText =await page.textContent('.inventory_item:first-child .btn_inventory');
    await expect(buttonText).toBe('Remove');
    const cartBadge = await page.locator('.shopping_cart_badge').textContent();
    expect(cartBadge).toBe('1');

    //click on Cart link
    await page.locator('[data-test="shopping-cart-link"]').click(); 

    //validate pre-added item is visible
    const cartItem = await page.locator('[data-test="inventory-item"]');
    await expect (cartItem).toContainText('Sauce Labs Backpack');

    //Click Checkout btn
    await page.locator('[data-test="checkout"]').click();

    // Input all required fields
    await page.fill('#first-name', 'Thanh');
    await page.fill('#last-name', 'Nguyen');
    await page.fill('#postal-code', '12345');

    //validate the corresponding fields display input text
    const firstName = await page.inputValue('#first-name');
    const lastName = await page.inputValue('#last-name');
    const postalCode = await page.inputValue('#postal-code');
    expect(firstName).toBe('Thanh');
    expect(lastName).toBe('Nguyen');
    expect(postalCode).toBe('12345');

    //Click Continue btn
    await page.locator('[data-test="continue"]').click();

    //validate checkout page has item added earlier
    const checkoutItem = await page.locator('[data-test="cart-list"]');
    await expect (checkoutItem).toContainText('Sauce Labs Backpack');

    //Click Finish btn
    await page.locator('[data-test="finish"]').click();

    //validate thank you msg
    await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
    await expect(page.locator('[data-test="complete-text"]')).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

  });
