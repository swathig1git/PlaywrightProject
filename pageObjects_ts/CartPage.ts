const {PaymentPage} = require ('../pageObjects/PaymentPage')
import { Locator, Page } from "playwright-core";

export class CartPage{
    page:Page;
    productLocator: Locator;
    divLocator: Locator;
    checkOutLocator: Locator;


    constructor(page: Page, productName: String){
        this.page = page;
        this.productLocator = this.page.locator('.cartSection h3:has-text("' + productName + '")');
        this.divLocator = page.locator("div li");
        this.checkOutLocator = page.locator(".subtotal .btn.btn-primary");

    }

    async getProductCount(){
         await this.divLocator.first().waitFor();
         const productCount = await this.productLocator.count();
         return productCount;

    }

    async checkOut(){
        await this.checkOutLocator.click();
        const paymentPage = new PaymentPage(this.page);
        return paymentPage;

    }
}
