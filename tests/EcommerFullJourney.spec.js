import {expect, test} from "@playwright/test";

test.only('rahulshettyacademy automation: Smoke Test', async ({browser}) =>
{
    const context = await browser.newContext(); 
    const page = await context.newPage();

    // Prepare test data
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signInButton = page.locator("[value='Login']");
    const products = page.locator(".card-body");
    const productsTitle = 'ZARA COAT 3';
    const cartButton = page.locator("[routerlink*='cart']");
    const email = "test2014@gmail.com";

    // Navigate to the application
    await page.goto('https://rahulshettyacademy.com/client');

    // Login Page
    await userName.fill(email);
    await password.fill("Tester12321!");
    await signInButton.click();
    
   /* Wait until network are idle state with no work left and page is loaded and using waitfor command
     to wait until specific element to appear */
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    // Product Page
    const titles = await products.locator("b").allTextContents();
    console.log(titles);
    
    const count = await products.count();
    console.log("Total products = " + count);

    for (let i = 0; i < count; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === productsTitle)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await cartButton.click();
    await page.locator("div li").first().waitFor();

    // Cart Page
    const bool = await page.locator("h3:has-text('" + productsTitle + "')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("button:has-text('Checkout')").click();

    /* Autocomplete address - country selection
    - PressSequentially will type the text with a small delay between each keystroke to simulate natural typing.
    - waitFor() is used to wait until the dropdown with class ta-results appears in the DOM.
    - Then, it counts the number of button elements within the dropdown and iterates through them to find the one that matches " India".
    - Once found, it clicks on that button to select the country.
     */
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    console.log("Country option = " + optionsCount);
    for (let i = 0; i < optionsCount; ++i)
    {   
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(await page.locator(".user__name label").textContent()).toContain(email);

    //card details
    /* await page.locator("[placeholder='Card Number']").fill("4111 1111 1111 1111");
    await page.locator("[placeholder='MM / YY']").fill("12/25");
    await page.locator("[placeholder='CVC']").fill("123");
    await page.locator("[placeholder='Name on Card']").fill("Test User"); */

    // Place the order
    await page.locator(".action__submit").click();

    // Order Confirmation Page
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const arraytext = orderId.split("|");
    const finalOrderId = arraytext[1].split("||")[0].trim(); 
    console.log("Order ID: " + finalOrderId);

    await page.pause();
});