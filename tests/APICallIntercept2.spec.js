const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');
const loginPayload = { userEmail: "swathi.g12025@gmail.com", userPassword: "RahulShetty123$" };
const createOrderPayload = { orders: [{ country: "India", productOrderedId: "68a961719320a140fe1ca57c" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(async ({ browser }) => {

  const apiContext = await request.newContext();
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


  await page.pause();

});