const {test, expect} = require("@playwright/test");

test("Popup validation", async ({page}) => {
  
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /* await page.goto("https://www.google.com");
    await page.goBack();
    await page.goForward();
    await page.reload(); */

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    /* The code `page.on('dialog', dialog => {
            console.log(dialog.message());
            dialog.accept(); or dismiss();
        });` is setting up an event listener on the page object for any dialog boxes that may appear
    during the test execution. It is for a popup without any HTML or javascript */
    page.on('dialog', dialog => {
        console.log(dialog.message());
        dialog.accept();
    });
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    //Frame handling example: frame is like a webpage inside a webpage
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck);
    console.log(textCheck.split(" ")[1]);
});