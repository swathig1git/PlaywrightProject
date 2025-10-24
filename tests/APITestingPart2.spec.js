
const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils')

const loginPayload = {userEmail: "swathi.g12025@gmail.com", userPassword: "RahulShetty123$"}
let response;

const createOrderPayload = {orders: [{country: "India", productOrderedId: "68a961719320a140fe1ca57c"}]};


test.beforeAll(async()=>{

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);

}

)

test ('End to End Playwright Test', async function({page})
{

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    const userNameValue = "swathi.g12025@gmail.com";

    await page.locator("button[routerlink$='/dashboard/myorders']").click();
    await page.waitForLoadState("networkidle");
    await page.locator("tr.ng-star-inserted th").first().waitFor();
    const orderObjects = await page.locator("tr.ng-star-inserted").filter({hasText: response.orderId});
    await expect (await orderObjects.count()).toEqual(1);
    await orderObjects.locator(".btn.btn-primary").click();

    await page.waitForLoadState("networkidle");
    await expect (await page.locator(".col-text.-main")).toHaveText(response.orderId);

    

    await expect (await page.locator(".content-title:has-text('BILLING ADDRESS')~ .text").first()).toHaveText(userNameValue);
    const billingCountry = await page.locator(".content-title:has-text('BILLING ADDRESS')~ .text").nth(1).textContent();

    //console.log("billingAddress: ", billingAddress);
    console.log("billingCountry: ", billingCountry);
//await page.pause();
});