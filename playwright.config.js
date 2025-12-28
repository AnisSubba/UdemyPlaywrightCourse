// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests', //can speicify if you want to run specific tests
  timeout: 40 * 1000, // for all the tests
  expect: { //for assertion testing
    timeout: 40 * 1000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium'
}
});

