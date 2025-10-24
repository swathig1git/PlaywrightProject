import {test, expect, request, APIRequestContext} from '@playwright/test';
import  {APIUtils, Response, LoginPayload, order, CreateOrderPayload, FakePayloadOrders} from './utils_ts/APIUtils';

const loginPayload:LoginPayload = {userEmail: "swathi.g12025@gmail.com", userPassword: "RahulShetty123$"};
const createOrderPayload:CreateOrderPayload = {orders: [{country: "India", productOrderedId: "68a961719320a140fe1ca57c"}]};
const fakePayloadOrders:FakePayloadOrders = {data:[], message:"No Orders"};
let response: Response;

test.beforeAll(async({browser})=>{

    const apiContext: APIRequestContext = await request.newContext();
    const apiUtils: APIUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
});
//added commient for commit
test ('End to End Playwright Test', async function({page})
{
    page.addInitScript(value=>{
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.waitForLoadState("networkidle");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
async (route) => {
      console.log('*** MOCK HIT! URL:', route.request().url());  // Confirm interception
      const realResponse = await page.request.fetch(route.request());  // Proxy for status/headers
      await route.fulfill({
        response: realResponse,  // Keeps 200 OK, auth headers, etc.
        body: JSON.stringify(fakePayloadOrders),  // CRITICAL: Stringify for JSON
        headers: {
          ...realResponse.headers(),
          'content-type': 'application/json',  // Ensure JSON type
        },
      });
      console.log('*** Mock fulfilled with fake body');  // Confirm
    }
  );


    await page.locator("button[routerlink$='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());

});