const {test, expect} = require('@playwright/test');
const {customtest} = require('./utils/testBase');
const {LoginPage} = require('../pageObjects/LoginPage')
const {ProductsPage} = require('../pageObjects/ProductsPage')
const {CartPage} = require('../pageObjects/CartPage')
const {PaymentPage} = require('../pageObjects/PaymentPage')



    customtest ("Fixture End to End Playwright Test", async function({browser, testDataForOrder})
    {
        const context = await browser.newContext();
        const testPage = await context.newPage();

        const loginPage = new LoginPage({page:testPage});
        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

        console.log(await testPage.title());

        const productsPage = new ProductsPage(testPage);
        await productsPage.addProductToCart(testDataForOrder.productName);
        await productsPage.viewCart();

        const cartPage = new CartPage(testPage,testDataForOrder.productName)
        const productCount = await cartPage.getProductCount();
        console.log('Element count:', productCount);  // Expect 1
        expect (productCount).toBeGreaterThanOrEqual(1);
        const paymentPage = await cartPage.checkOut();

        const expiryMonth = "05";
        const expiryYear = "25";
        const country = "ind";
        await paymentPage.setData(expiryMonth, expiryYear, country);
        const userNameOnLabel = await paymentPage.getUserName();
        await paymentPage.selectCountry();
        await paymentPage.submitPayment();

    });


