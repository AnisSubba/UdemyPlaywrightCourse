import { test, expect } from '@playwright/test';

test('Playwright Locator test', async ({page}) =>   
{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    
    // getbylabel example for checkbox and radio button
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await expect(page.getByLabel("Check me out if you Love IceCreams!")).toBeChecked();

    await page.getByLabel("Employed").check();
    await expect(page.getByLabel("Employed")).toBeChecked();

    await page.getByLabel("Gender").selectOption("Female");
    await expect(page.getByLabel("Gender")).toHaveValue("Female");

    // getbyplaceholder example for text box and password box
    await page.locator(".form-group [name*='name']").fill("TestName");
    await page.getByPlaceholder("Password").fill("TestName");
    // await expect(page.getByLabel("Password")).toHaveValue("TestName");

    // getbyrole example for button and link
    await page.getByRole("button", { name: 'Submit' }).click();
    await expect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible();

    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

});