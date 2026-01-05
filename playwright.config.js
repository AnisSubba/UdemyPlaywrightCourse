// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
/* This code snippet is exporting a default configuration object using the `defineConfig` function
provided by Playwright's testing library. The configuration object specifies various settings for
running tests, such as the directory where the tests are located (`testDir`), the timeout for all
tests (`timeout`), the timeout for assertion testing (`expect.timeout`), the reporter to use
(`reporter`), and the browser to use (`use.browserName`). In this case, the configuration is set to
run tests in Firefox browser in non-headless mode. */
export default defineConfig({
  testDir: './tests', //can speicify if you want to run specific tests
  timeout: 40 * 1000, // for all the tests
  expect: { //for assertion testing
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false
}
});
