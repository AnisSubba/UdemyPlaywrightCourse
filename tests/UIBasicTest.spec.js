
/* The code `import { test } from '@playwright/test';` is importing the `test` function from the
`@playwright/test` module. This function is used to define and run tests in Playwright, a Node.js
library for automating browsers. By importing the `test` function, you can create test cases that
interact with web pages and perform various actions such as navigation, clicking elements, and more
within a browser context. */
import { expect, test } from '@playwright/test';

/* The code snippet `test('Browser Context Playwright test', async ({browser}) => { const context =
await browser.newContext(); const page = await context.newPage(); await
page.goto('https://youtube.com'); console.log(await page.title()); await
expect(page).toHaveTitle("YouTube"); });` is defining a Playwright test named 'Browser Context
Playwright test'. Inside this test function, it performs the following actions: */
test('Browser Context Playwright test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://youtube.com');
    console.log(await page.title());
    await expect(page).toHaveTitle("YouTube");

});

/* The code snippet `test('Page Playwright test', async ({page}) => { await
page.goto('https://google.com'); console.log(await page.title()); await
expect(page).toHaveTitle("Google"); });` is defining a Playwright test named 'Page Playwright test'.
Inside the test function, it is using the `page` object provided as a parameter to navigate to the
'https://google.com' website. After navigating to the Google website, it retrieves the title of the
page using `page.title()`, logs the title to the console, and then asserts that the title of the
page is "Google" using `expect(page).toHaveTitle("Google")`. This test essentially verifies that the
title of the Google website matches the expected value "Google". */
test('Page Playwright test', async ({page}) =>
{
    await page.goto('https://google.com');
    //get title - assertion title matches
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});