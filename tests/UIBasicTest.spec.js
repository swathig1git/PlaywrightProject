const {test, expect} = require('@playwright/test');

test ('Browser Context Playwright Test', async function({browser})
{
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on('request', request=>console.log("request", console.log(request.url())));
    page.on('response', response=>console.log("response", response.url(), response.status()));
    await page.route("**/*.{jpg,png,jpeg}", route=>route.abort())
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles =  page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());
    await expect (page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await userName.fill("rahulshettyacademy")
    await page.locator("[type='password']").fill("learning");
    await signIn.click();

    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.nth(1).textContent());
    //console.log(await cardTitles.last().textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    //await page.pause();

});


test ('Without Browser Context Playwright Test', async function({page})
{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect (page).toHaveTitle("Google");

});