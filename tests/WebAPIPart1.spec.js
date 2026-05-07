const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail:"test2014@gmail.com",userPassword:"Tester12321!"};
let token;
// The beforeAll hook is used to perform setup tasks that need to be done once before all tests in the test suite are executed. In this case, it is used to authenticate the user and obtain a token that will be used for subsequent API requests or interactions with the application during the tests. By placing this code in beforeAll, we ensure that the authentication process is completed only once, and the obtained token can be reused across multiple tests, improving efficiency and reducing redundant code.
test.beforeAll( async () => {
    // Create a new API context using Playwright's request object to make API calls without needing to launch a browser. This allows us to perform API requests directly and efficiently, which is particularly useful for tasks like authentication where we need to obtain a token before interacting with the application through the UI.
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayload
        }) //200, 2091
        expect(loginResponse.ok()).toBeTruthy(); 
        
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log(token);
    
});

test.beforeEach( () => {
    
});

test('PLace the order', async ({page}) =>
{
        // Set the token in local storage before navigating to the page to bypass login and directly access the application with authenticated session
      page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);
    // Prepare test data
    const products = page.locator(".card-body");
    const productsTitle = 'ZARA COAT 3';
    const cartButton = page.locator("[routerlink*='cart']");
    const email = "test2014@gmail.com";
    const TextBoxes = page.locator(".input.txt");
    const dateBox = page.locator(".ddl");

    await page.goto('https://rahulshettyacademy.com/client');

    
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

    //Create Order API call with token and order details
});

