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
    const TextBoxes = page.locator(".input.txt");
    const dateBox = page.locator(".ddl");

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

    //card details entry
    await TextBoxes.nth(0).fill("4111111111111111");
    await TextBoxes.nth(1).fill("123");
    await TextBoxes.nth(2).fill("Tester Testerson");
    
    //Expiry date selection
    await dateBox.nth(0).selectOption("12");
    await dateBox.nth(1).selectOption("30");

    // Place the order
    await page.locator(".action__submit").click();

    // Order Confirmation Page
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const arraytext = orderId.split("|");
    const finalOrderId = arraytext[1].split("||")[0].trim(); 
    console.log("Order ID: " + finalOrderId);

    // Go to Orders details page. can you button[routerlink*='myorders'] or li [routerlink*='myorders']
    await page.locator("li [routerlink*='myorders']").click();

    // wait for orders page to load
    await page.locator("tbody").waitFor();

    // Orders Page - Verify order in orders list: can use tbody tr
    const orderIDGroup = await page.locator("tbody tr");
    const orderCount = await orderIDGroup.count();
    for (let i = 0; i < orderCount; ++i)
    {   
        const orderIDText = await orderIDGroup.nth(i).locator("th").textContent();
        if (orderIDText === finalOrderId)
        {   
            await orderIDGroup.nth(i).locator("button:has-text('View')").click();
            break;
        }
    }

    // Order Details Page - Verify order ID
    const orderDetailsId = await page.locator(".-main").textContent();
    console.log("Confirmed Order Details ID matches the order ID during order made: " + orderDetailsId);
    expect(finalOrderId.includes(orderDetailsId)).toBeTruthy();



    // await page.pause();
});