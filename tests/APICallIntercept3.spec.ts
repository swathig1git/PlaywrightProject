import { test, expect, request, APIRequestContext } from '@playwright/test';
import  {APIUtils, Response, LoginPayload, order, CreateOrderPayload, FakePayloadOrders} from './utils_ts/APIUtils';
const loginPayload:LoginPayload = { userEmail: "swathi.g12025@gmail.com", userPassword: "RahulShetty123$" };
const createOrderPayload: CreateOrderPayload = { orders: [{ country: "India", productOrderedId: "68a961719320a140fe1ca57c" }] };
const fakePayloadOrders:FakePayloadOrders = { data: [], message: "No Orders" };
let response:Response;

test.beforeAll(async ({ browser }) => {

  const apiContext: APIRequestContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(createOrderPayload);
});

test('Security Intercept Test', async function ({ page }) {

  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.waitForLoadState("networkidle");

  await page.locator("button[routerlink$='/dashboard/myorders']").click();

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" })
  )
  await page.locator("button:has-text('View')").first().click();


  //await page.pause();

});