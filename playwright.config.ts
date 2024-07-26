import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    //['html'],
    //['list'],
    //['line'],
    ['allure-playwright'],
  ],


  /*Set timeout*/
  timeout: 45 * 10000,
  
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    baseURL:'https://the-internet.herokuapp.com/',
    viewport: {width: 1920, height:1080},
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    //setup project
    { name: 'setup', testMatch: 'auth.setup.ts'},

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/user.json'  
       },
       dependencies: ['setup'],
    },

    {
      name: 'specific url',
      use:{
        baseURL:'https://www.google.com/',
        viewport: {width: 720, height: 400}
    },
    testMatch: 'session4.spec.ts'
    },
    
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
      storageState: 'playright/.auth/user.json',
      video: 'on',
      viewport: {width: 1366, height: 768},
       },
       dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
        video: 'on',
        viewport: {width: 1920, height: 1080}
       },
      
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge',
        viewport: {width: 1366, height: 768}
       },
    },
    {
     name: 'chrome',
    use: { ...devices['Desktop Chrome'], channel: 'chrome',
      viewport: {width: 1920, height: 1080}

     },
     },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
