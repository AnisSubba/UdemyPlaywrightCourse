const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail:"test2014@gmail.com",userPassword:"Tester12321!"};

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayload
        })
        expect(loginResponse.ok()).toBeTruthy(); 
        const loginResponseJson = await loginResponse.json();
    
});

test.beforeEach( () => {
    
});

