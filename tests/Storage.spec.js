
const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils')

const loginPayload = {userEmail: "swathi.g12025@gmail.com", userPassword: "RahulShetty123$"}
let response;

const createOrderPayload = {orders: [{country: "India", productOrderedId: "68a961719320a140fe1ca57c"}]};

let webContext;

test.beforeAll(async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const logIn =  page.locator("#login");
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await userName.fill("swathi.g12025@gmail.com")
    await userPassword.fill("RahulShetty123$");
    await logIn.click();
    await page.waitForLoadState("networkidle");
    await context.storageState({path:"state.json"});

    webContext = await browser.newContext({storageState:"state.json"})
}

);

test ('Storage State Test', async function()
{


    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const userNameValue = "swathi.g12025@gmail.com";

    await page.locator("button[routerlink$='/dashboard/myorders']").click();
    await page.waitForLoadState("networkidle");
    await page.locator("tr.ng-star-inserted th").first().waitFor();

});

test ('Storage State Test 2', async function()
{


    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("button[routerlink$='/dashboard/myorders']").click();
//await page.pause();
});