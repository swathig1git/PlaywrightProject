// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout:40*1000,
  retries:1,
  expect: {
    timeout: 5000
  },
  reporter: [['html']],
  projects:[
    {
      name:'firefox',
      use: {
        browserName:'firefox',
        headless:false,
        screenshot:'on',
        trace:'on',
        viewport:{width:720,height:720}
      }
    },
    {
      name:'chrome',
      use: {
        browserName:'chromium',
        headless:false,
        screenshot:'on',
        trace:'on',
        video:'on',
        viewport:{width:500,height:500}
      },
    },

    {
      name:'safari',
      use: {
        browserName:'webkit',
        headless:false,
        screenshot:'on',
        trace:'on',
        ignoreHTTPSErrors:true,
        permissions:['Geolocation'],
        ...devices['iPhone 11']
      },
    }
  ]

});

