const {test, expect} = require('@playwright/test');

test("Calendar Validation", async({page})=>{

    const month = 4;
    const day = 6;
    const year = "2024";
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(month-1).click();
    await page.locator(".react-calendar__tile.react-calendar__month-view__days__day").nth(day-1).click();

    await expect(await page.locator(".react-date-picker__inputGroup__month")).toHaveAttribute("value", String(month));


})