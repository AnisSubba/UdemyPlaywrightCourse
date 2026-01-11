import { expect, test } from '@playwright/test';

test('Rahulshettyacademy playwright test', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/client');
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    await page.locator("#userEmail").fill("test2014@gmail.com");
    await page.locator("#userPassword").fill("Tester12321!");
    await page.locator("#login").click();

    console.log(await page.locator(".card-body h5 b").first().textContent());
    const allTitles = await page.locator(".card-body h5 b").allTextContents();
    console.log(allTitles);

});

test.only('Demo Website test', async ({page}) =>
{
    const userName = page.locator("#email");
    const password = page.locator("#password");
    const loginButton = page.locator(".btnSubmit");
    const navTitle = page.locator(".btn-group-vertical a");
    const homeButton = page.locator(".nav-link.active");
    const productTitle = page.locator(".card-title");
    const allProductTitles = await productTitle.allTextContents();

    await page.goto('https://practicesoftwaretesting.com/auth/login');
    //get title - assertion title matches
    console.log(await page.title());
    await expect(page).toHaveTitle("Login - Practice Software Testing - Toolshop - v5.0");

    await page.locator("a[aria-label='Register your account']").click();

    await page.locator("#first_name").fill("Akl");
    await page.locator("#last_name").fill("Best");
    await page.locator("#dob").fill("1990-01-01");
    await page.locator("#street").fill("123 Main St");
    await page.locator("#city").fill("Anytown");
    await page.locator("#state").fill("Anystate");
    await page.locator("#postal_code").fill("II123AB");
    await page.locator("#country").selectOption('GB');
    await page.locator("#phone").fill("07152345678");
    await userName.fill("aklt2014@gmail.com");
    await password.fill("Tester12321!");
    await page.locator("button[type='submit']").click();
    
    // login not working after registration
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await userName.fill("aklt2014@gmail.com");
    await password.fill("Tester12321!");
    await loginButton.click();

    console.log(await navTitle.nth(1).textContent());
    console.log(await navTitle.allTextContents());  

    await homeButton.click();
    console.log(await productTitle.nth(2).textContent());
    console.log(allProductTitles);

});