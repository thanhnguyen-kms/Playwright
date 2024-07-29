import { test, expect } from '@playwright/test';

test('Print url & username & password base on env', async ({ page }) => {
    console.log("URL: " + process.env.BASE_URL);
    console.log("User: " + process.env.USERNAME);
    console.log("Password: " + process.env.PASSWORD)
});

test.skip('Go to page on env', async ({ page }) => {
    console.log(process.env.BASE_URL!);
    await page.waitForTimeout(3000)
});
