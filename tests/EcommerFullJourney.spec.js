import {expect, test} from "@playwright/test";

test.beforeAll('rahulshettyacademy automation: Smoke Test', async ({browser}) =>
{
    const context = await browser.newContext(); 
    const page = await context.newPage();

    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInButton = page.locator("#signInBtn");

    await page.goto('https://rahulshettyacademy.com/client');
    await userName.fill("test2014@gmail.com");
    await password.fill("Tester12321!");
    await signInButton.click();

    

});