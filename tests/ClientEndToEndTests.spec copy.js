const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test ('@web End to End Playwright Test', async function({browser})
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const logIn =  page.locator("#login");
    const cardTitles =  page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());

    await userName.fill("swathi.g12025@gmail.com")
    await userPassword.fill("RahulShetty123$");
    await logIn.click();
    await page.waitForLoadState("networkidle");

    const testProduct = "ADIDAS ORIGINAL";
    await page.locator(".card-body b").last().waitFor();
    const products = await page.locator(".card-body b").allTextContents();

    const count = products.length;
    for(let i=0; i<count; i++)
    {
        if (products[i] === testProduct)
        {
            await page.locator(".card-body").nth(i).locator("text= Add To Cart").click();
        }
    }

    await page.locator(".btn.btn-custom").locator("text= Cart").click();



    const productLocator = page.locator('.cartSection h3:has-text("ADIDAS ORIGINAL")');
            
    //await expect (productLocator).toBeVisible();

    //await expect (productLocator).toBeVisible({ timeout: 10000 });
    await page.locator("div li").first().waitFor(); // another way to wait till the products are loaded 

    const productCount = await productLocator.count();
    console.log('Element count:', productCount);  // Expect 1


    const isProductVisible = await productLocator.isVisible(); 
    expect (isProductVisible).toBeTruthy();

    await page.locator(".subtotal .btn.btn-primary").click();

    await page.locator(".payment__info").waitFor();

    const expiryMonth = page.locator(".input.ddl").nth(0);
    const expiryYear = page.locator(".input.ddl").nth(1);

    await expiryMonth.selectOption("05");
    await expiryYear.selectOption("25")

    await page.locator("[placeholder*='Country']").pressSequentially("ind");

    await page.locator("button.ta-item").first().waitFor();

    const options = await page.locator("button.ta-item");

    const optionsCount = await page.locator("button.ta-item").count();
    console.log("option count =", optionsCount);

    for (let i=0; i <optionsCount; i++)
    {

        let text1 = await options.nth(i).textContent;
        console.log("text1 =", text1);
        if (text1 === "India")
        {
            await options.nth(i).click();
            break;
        }

    }
    //await page.locator(".fa.fa-search").nth(1).click();
    await page.locator(".action__submit").click();

    await page.waitForLoadState("networkidle");
    //await page.locator("h1").first().waitFor();
    const bannerMessage = page.locator("h1:has-text('THANKYOU FOR THE ORDER.')")

    const isBannerMessageVisible = await bannerMessage.isVisible();
    expect (isBannerMessageVisible).toBeTruthy();

    //await page.pause();



});

