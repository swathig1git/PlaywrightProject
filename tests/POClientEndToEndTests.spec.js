const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');
const {LoginPage} = require('../pageObjects/LoginPage')
const {ProductsPage} = require('../pageObjects/ProductsPage')
const {CartPage} = require('../pageObjects/CartPage')
const {PaymentPage} = require('../pageObjects/PaymentPage')
const dataSet = JSON.parse(JSON.stringify(require('../tests/utils/placeOrderTestData.json')))

for (const data of dataSet)
{

    test (`PO End to End Playwright Test ${data.productName}`, async function({browser})
    {
        const context = await browser.newContext();
        const page = await context.newPage();

        const loginPage = new LoginPage({page});
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        console.log(await page.title());

        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCart(data.productName);
        await productsPage.viewCart();

        const cartPage = new CartPage(page,data.productName)
        const productCount = await cartPage.getProductCount();
        console.log('Element count:', productCount);  // Expect 1
        expect (productCount).toBeGreaterThanOrEqual(1);
        const paymentPage = await cartPage.checkOut();

        const expiryMonth = "05";
        const expiryYear = "25";
        const country = "ind";
        (await paymentPage).setData(expiryMonth, expiryYear, country);
        const userNameOnLabel = await paymentPage.getUserName();
        await paymentPage.selectCountry();
        await paymentPage.submitPayment();

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

        

        await expect (await page.locator(".content-title:has-text('BILLING ADDRESS')~ .text").first()).toHaveText(data.username);
        const billingCountry = await page.locator(".content-title:has-text('BILLING ADDRESS')~ .text").nth(1).textContent();

        //console.log("billingAddress: ", billingAddress);
        console.log("billingCountry: ", billingCountry);


        







        

        //await page.pause();
    });
}

