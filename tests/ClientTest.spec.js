const {test, expect} = require('@playwright/test');

test ('@web Browser Context Playwright Test', async function({browser})
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const logIn =  page.locator("#login");
    const cardTitles =  page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    //await expect (page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await userName.fill("swathi.g12025@gmail.com")
    await userPassword.fill("RahulShetty123$");
    await logIn.click();

    //await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").last().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);


});

