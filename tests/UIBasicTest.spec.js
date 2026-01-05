
/* The code `import { test } from '@playwright/test';` is importing the `test` function from the
`@playwright/test` module. This function is used to define and run tests in Playwright, a Node.js
library for automating browsers. By importing the `test` function, you can create test cases that
interact with web pages and perform various actions such as navigation, clicking elements, and more
within a browser context. */
import { expect, test } from '@playwright/test';


test('Browser Context Playwright test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://youtube.com');
    console.log(await page.title());
    await expect(page).toHaveTitle("YouTube");

});


test('Page Playwright test', async ({page}) =>
{
    const userName = page.locator("[name='email']");
    const password = page.locator("[type='password']");
    const loginButton = page.locator("[value='Login']");
    const errorMessage = page.locator(".alert.alert-danger");


    await page.goto('https://demotest.website/user/login');
    //get title - assertion title matches
    console.log(await page.title());
    await expect(page).toHaveTitle("Login");
    await userName.fill("anime@gm.com");
    await password.fill("Anime");
    await loginButton.click();

    console.log(await errorMessage.textContent());
    await expect(errorMessage).toContainText("incorrect");

    await userName.fill("");
    await userName.fill("test123@gmail.com");
    await password.fill("");
    await password.fill("test123");
    await loginButton.click();

    console.log(await page.locator(".hero-content a").textContent());

});