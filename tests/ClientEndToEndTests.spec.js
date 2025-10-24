const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test ('End to End Playwright Test', async function({browser})
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#userEmail");
    const userNameValue = "swathi.g12025@gmail.com";
    const userPassword = page.locator("#userPassword");
    const logIn =  page.locator("#login");
    const cardTitles =  page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());

    await userName.fill(userNameValue)
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
    await expiryYear.selectOption("25");

    const label = page.locator("label[type='text']");
    const labelText = await label.textContent();
    expect (labelText?.trim()).toBe(userNameValue);


    await page.locator("[placeholder*='Country']").pressSequentially("ind");

    await page.locator("button.ta-item").first().waitFor();

    // Wait for options to appear
    await page.waitForSelector('button.ta-item', { timeout: 5000 });

    await page.locator("button.ta-item").filter({hasText:/\bIndia\b/}).click();


    //await page.locator(".fa.fa-search").nth(1).click();
    await page.locator(".action__submit").click();

    await page.waitForLoadState("networkidle");
    //await page.locator("h1").first().waitFor();
    const bannerMessage = page.locator("h1:has-text('THANKYOU FOR THE ORDER.')")

    await expect(bannerMessage).toBeVisible();
    const isBannerMessageVisible = await bannerMessage.isVisible();
    expect (isBannerMessageVisible).toBeTruthy();

    //const orderIdLocator = page.locator(".box label.ng-star-inserted");
    let orderId = await page.locator(".box label.ng-star-inserted").textContent();
    console.log("orderId", orderId);
    orderId = orderId.trim().replace(/\|/g,"");
    console.log("orderId", orderId);
    await page.locator("button[routerlink$='/dashboard/myorders']").click();
    await page.waitForLoadState("networkidle");
    await page.locator("tr.ng-star-inserted th").first().waitFor();
    const orderObjects = await page.locator("tr.ng-star-inserted").filter({hasText: orderId});
    await expect (await orderObjects.count()).toEqual(1);
    await orderObjects.locator(".btn.btn-primary").click();

    await page.waitForLoadState("networkidle");
    await expect (await page.locator(".col-text.-main")).toHaveText(orderId);

    

    await expect (await page.locator(".content-title:has-text('BILLING ADDRESS')~ .text").first()).toHaveText(userNameValue);
    const billingCountry = await page.locator(".content-title:has-text('BILLING ADDRESS')~ .text").nth(1).textContent();

    //console.log("billingAddress: ", billingAddress);
    console.log("billingCountry: ", billingCountry);


    







    

    //await page.pause();
});

