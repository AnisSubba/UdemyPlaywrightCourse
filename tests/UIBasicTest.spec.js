
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


/* The code block `test('Page Playwright test', async ({page}) => { ... }` is defining a test case
using Playwright's testing framework. In this test case, the test function is expecting a `page`
object as a parameter, which represents a browser page where the test actions will be performed. */
test('Page Playwright test', async ({page}) =>
{
    // page not working 
    const userName = page.locator("[name='email']");
    const password = page.locator("[type='password']");
    const loginButton = page.locator("[value='Login']");
    const errorMessage = page.locator(".alert.alert-danger");
    const contentTitle = page.locator(".content h4");


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

    console.log(await page.locator(".hero-content a").inputValue());
    console.log(await contentTitle.nth(1).inputValue());
    console.log(await contentTitle.first().inputValue());
    /* alltextContents provides array so if no textContent which has attached validation, 
    so if only added allTextContents by itself it will return the array with 0 element */
    const allTitles = await contentTitle.allTextContents();
    console.log(allTitles);

});

test('rahulshettyacademy automation: UI Control', async ({page}) =>
{
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInButton = page.locator("#signInBtn");
    const dropdwonOptions = page.locator("select.form-control");
    const documentLink = page.locator("a[href*='documents-request']");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");    

    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    // select by value
    await dropdwonOptions.selectOption("consult"); 
    
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();

    /* The code `console.log(await page.locator(".radiotextsty").last().isChecked());` is checking
    whether the last radio button element with the class "radiotextsty" on the page is currently
    checked or not. */
    console.log(await page.locator(".radiotextsty").last().isChecked());
    /* The code `await expect(await page.locator(".radiotextsty").last().toBeChecked());` is performing an
    assertion using Playwright's testing framework. */
    await expect(await page.locator(".radiotextsty").last()).toBeChecked();

    // Term and condition checkbox is clicked and assertion to validate that it is checked
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();

    // Term and condition checkbox is unchecked and assertion to validate that it is unchecked
    await page.locator("#terms").uncheck(); 
    await expect(page.locator("#terms")).not.toBeChecked();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    // validate the document link has attribute blinkingText 
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    // await signInButton.click();
    
    // will open playwright inspector which allows you to see the steps 
    // await page.pause();
});

/* Autoamtion testing on Rahual Sheety Academy 
    - Pacing into the main login page 
    - Clicking the banner which opens a new window
    - Validating the new window is opened and can be interacted with
    - Getting the email domain name from the text and filling in the username field for parent page
     */

test.only('rahulshettyacademy automation: child windows', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("a[href*='documents-request']");
    
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), //listening for new page event pending, rejected, fulfilled
            documentLink.click(),
        ]) //new page is opening 
           const text = await newPage.locator(".red").textContent();
           const arraytext = text.split("@");
           const domain = arraytext[1].split(" ")[0];
           console.log(domain);//getting the email domain name from the text
           console.log(text);

        await page.locator("#username").fill(domain); //getting the email domain name from the text and filling in the username field for parent page
        console.log( await page.locator("#username").inputValue());// inputvalue is required to get the value filled in the field by script automation while textContent will not work
});