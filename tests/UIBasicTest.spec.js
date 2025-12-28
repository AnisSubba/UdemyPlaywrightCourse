/* This code snippet is using Playwright, a Node.js library for automating browsers, to run tests on
web pages. */
/* The code `import { test } from '@playwright/test';` is importing the `test` function from the
`@playwright/test` module. This function is used to define and run tests in Playwright, a Node.js
library for automating browsers. By importing the `test` function, you can create test cases that
interact with web pages and perform various actions such as navigation, clicking elements, and more
within a browser context. */
import { expect, test } from '@playwright/test';

/* This code snippet is defining a Playwright test named 'Browser Context Playwright test'. Inside the
test function, it creates a new browser context using `browser.newContext()`, then creates a new
page within that context using `context.newPage()`, and finally navigates the page to
'https://youtube.com' using `page.goto('https://youtube.com')`. This test is essentially opening a
new browser context, creating a new page within that context, and navigating to the YouTube website. */
test('Browser Context Playwright test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://youtube.com');
    console.log(await page.title());

});

/* The code snippet `test('Page Playwright test', async ({page}) => { await
page.goto('https://google.com'); });` is defining a Playwright test named 'Page Playwright test'.
Inside the test function, it is using the `page` object provided as a parameter to navigate to the
'https://google.com' website. This test is essentially opening a new page within an existing browser
context and navigating to the Google website. */
test('Page Playwright test', async ({page}) =>
{
    await page.goto('https://google.com');
    //get title - assertion title matches
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});