const {test, expect} = require('@playwright/test');

test('Browser Context Playwright Test', async function({browser})
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const userPassword = page.locator("#password");
    const userTypes = page.locator(".radiotextsty");
    const occupations = page.locator("select.form-control");

    const signIn =  page.locator("#signInBtn");
    const cardTitles =  page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //await expect (page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await userName.fill("rahulshettyacademy")
    await userPassword.fill("learning");
    await userTypes.last().click();
    expect(userTypes.last()).toBeChecked();
    await page.locator("#okayBtn").click();
    await occupations.selectOption("consult");
    await page.locator("#terms").click();
    expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect (page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");

    await signIn.click();
    //await page.pause();



});

test ('Multiple tabs', async function({browser})
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
    [context.waitForEvent("page"),
     documentLink.click()]
    )

    

    const text = await newPage.locator(".red").textContent();

    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    //console.log(domain);
    await page.locator("#username").fill(domain);
    //await page.pause();
    const username=  await page.locator("#username").inputValue();
    console.log(username);

})

