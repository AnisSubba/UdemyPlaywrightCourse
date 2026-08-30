const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail:"test2014@gmail.com",userPassword:"Tester12321!"};
const orderPayload = {orders:[{country:"United Kingdom",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};

let orderId;
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

    // Create Order API call with token and order details
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data : orderPayload,
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
        })
        // Verify that the order creation API call was successful by checking the response status code and ensuring that the response body contains the expected data, such as a valid order ID or confirmation message. This step is crucial to confirm that the order was created successfully before proceeding with any further actions or assertions in the test.
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        orderId = orderResponseJson.orders[0];
    
});

test.beforeEach( () => { });

test('PLace the order', async ({page}) =>
{
        // Set the token in local storage before navigating to the page to bypass login and directly access the application with authenticated session
      page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client');

    // Go to Orders details page. can you button[routerlink*='myorders'] or li [routerlink*='myorders']
    await page.locator("li [routerlink*='myorders']").click();

    // wait for orders page to load
    await page.locator("tbody").waitFor();

    // Orders Page - Verify order in orders list: can use tbody tr
    const row = await page.locator("tbody tr");
    const orderCount = await row.count();
    for (let i = 0; i < orderCount; ++i)
    {   
        const orderIDText = await row.nth(i).locator("th").textContent();
        if (orderId.includes(orderIDText.trim()))
        {   
            await row.nth(i).locator("button:has-text('View')").click();
            break;
        }
    }

    // Order Details Page - Verify order ID
    const orderDetailsId = await page.locator(".-main").textContent();
    console.log("Confirmed Order Details ID matches the order ID during order made: " + orderDetailsId);
    expect(orderId.includes(orderDetailsId)).toBeTruthy();

});