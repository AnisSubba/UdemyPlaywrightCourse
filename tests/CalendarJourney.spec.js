import {test, expect} from "@playwright/test";

test.only('Calender journey', async ({page}) =>
{
    
    const month = "6";
    const day = "15";
    const year = "2027";
    const expectedDate = [month,day,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    
    await page.locator(".react-date-picker__calendar-button").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(parseInt(month) - 1).click();
    await page.locator(".react-calendar__month-view__days__day").filter({hasText: day}).click();
    // await page.locator("//abbr[text()='"+day+"']").click(); using xpath for same day selection


    const selectedDate = await page.locator("[name*='date']").getAttribute("value");
    console.log(selectedDate);
    expect(selectedDate).toContain(year+ '-' + month.padStart(2, '0') + '-' + day);

    //or you can use below assertion as well
    /* const inputs = page.locator('.react-date-picker__inputGroup__input');

    for(let i = 0; i < expectedDate.length; ++i)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedDate[i]);
    } */

});