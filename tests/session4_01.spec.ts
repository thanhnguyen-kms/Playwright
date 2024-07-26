import { test, expect } from '@playwright/test';
import path from 'path';

test.skip('TC001 - Verify Checkboxes', { tag: '@regression'}, async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Checkboxes' }).click();
  await expect(page.getByRole('heading')).toContainText('Checkboxes');
  await page.getByRole('checkbox').first().uncheck();
  await expect(page.getByText(' checkbox 1')).toBeVisible();
  await page.getByRole('checkbox').nth(1).uncheck();
  await expect(page.getByText(' checkbox 2')).toBeVisible();
});

test('TC002 - Verify Drag and Drop', { tag: '@smoke'}, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Drag and Drop' }).click();
    const source = page.locator("#column-a");
    const target = page.locator("#column-b");
    await source.dragTo(target);
  });

test('TC003 - Verify Dropdown', { tag: '@regression'}, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Dropdown' }).click();
  await page.locator('#dropdown').selectOption('2');
  await expect(page.locator('#dropdown')).toHaveValue('2');
  await page.locator('#dropdown').selectOption('1');
  await expect(page.locator('#dropdown')).toHaveValue('2');
  await page.locator('#dropdown').selectOption('2');
  await expect(page.locator('#dropdown')).toHaveValue('2');
});

test('TC004 - Verify Frames (alternative)',{ tag: '@smoke'}, async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/');
    await expect(page.locator('h1')).toContainText('Frames And Windows');
    await page.getByRole('tab', { name: 'iFrame' }).click();
    await expect(page.frameLocator('iframe[name="globalSqa"]').locator('#wrapper div').filter({ hasText: 'HomeTrainings' }).nth(1)).toBeVisible();
    await page.frameLocator('iframe[name="globalSqa"]').getByPlaceholder('Search...').fill('Playright');
    await page.frameLocator('iframe[name="globalSqa"]').getByRole('button').click();
    await expect(page.frameLocator('iframe[name="globalSqa"]').locator('ol')).toContainText('Sorry, no posts matched your criteria.');
  });

test('TC005 - Verify Upload file', { tag: '@smoke'}, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'File Upload' }).click();
    await expect(page.getByRole('heading')).toContainText('File Uploader');
    await page.locator('#file-upload').setInputFiles('/Users/thanhthiphuongnguyen/Desktop/Screenshots/Screenshot 2024-07-13 at 23.55.10.png');
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.locator('#uploaded-files')).toContainText('Screenshot 2024-07-13 at 23.55.10.png');
})

test('TC006 - Verify Dynamically Loaded Page Elementsst', { tag: ['@regression', '@smoke']}, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Dynamic Loading' }).click();
    await page.getByRole('heading', { name: 'Dynamically Loaded Page' }).click();
    await expect(page.getByRole('heading')).toContainText('Dynamically Loaded Page Elements');
    await page.getByRole('link', { name: 'Example 1: Element on page' }).click();
    await expect(page.locator('h3')).toContainText('Dynamically Loaded Page Elements');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.waitForLoadState();
    await expect(page.locator('#finish')).toContainText('Hello World!');
  });

  test('TC007 - Verify input', { tag: ['@regression', '@smoke']}, async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await expect(page.locator('h1')).toContainText('Automation Testing Practice');
    await page.locator('#name').fill('Thanh Nguyen');
    await page.getByLabel('Address:').fill('KMS-Technology');
    await page.locator('#name').clear();
    await page.getByLabel('Address:').clear();
  });

  test('TC008 - Verify prompt dialog', { tag: ['@regression', '@smoke'] }, async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await expect(page.locator('h1')).toContainText('Automation Testing Practice');
    page.on('dialog', async dialog=> {
        expect(dialog.type()).toContain('prompt');
        expect(dialog.message()).toContain('Please enter your nam');
        expect(dialog.defaultValue()).toContain('Harry Potter');
        await dialog.accept('Thanh Nguyen');
    })
    await page.click('//button[normalize-space()="Prompt"]');
    await expect(page.locator('#demo')).toContainText('Hello Thanh Nguyen! How are you today?');
  });

  