const{test, expect} = require("@playwright/test");

test.describe.configure({mode:'serial'})

test("More Validations", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com/");
    //await page.goBack();
    await expect(await page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(await page.locator("#displayed-text")).toBeHidden();
    await page.locator("#show-textbox").click();
    await expect(await page.locator("#displayed-text")).toBeVisible();

    await page.on("dialog", dialog=>dialog.dismiss());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    let subscriberString = await framesPage.locator(".text h2").textContent();
    let parts = subscriberString.split(" ");
    const subscriberCount = parseInt(parts[1].replace(/,/g,""));
    console.log("subscriberCount", subscriberCount);

})

test("@web Screenshot and Visual Comparision", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com/");
    //await page.goBack();
    await expect(await page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'})
    await expect(await page.locator("#displayed-text")).toBeHidden();

})

test ("Visual Testing", async({page})=>{
    await page.goto("https://en.wikipedia.org/wiki/Main_Page");
    expect(await page.screenshot()).toMatchSnapshot("landing.png");
})