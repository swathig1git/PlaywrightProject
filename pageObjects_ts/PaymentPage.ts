import {Page, Locator} from "playwright-core";

export class PaymentPage{
    page: Page;
    paymentInfoLocator: Locator;
    expiryMonth: Locator;
    expiryYear: Locator;
    paymentUserName: Locator;
    country: Locator;
    submitButton: Locator;



    constructor(page:Page){
        this.page = page;
        this.paymentInfoLocator =  page.locator(".payment__info");
        this.expiryMonth   = page.locator(".input.ddl").nth(0);
        this.expiryYear  = page.locator(".input.ddl").nth(1);
        this.paymentUserName = page.locator("label[type='text']");
        this.country = page.locator("[placeholder*='Country']");
        this.submitButton = page.locator(".action__submit");

    }
    async submitPayment(){
        await this.submitButton.click();
        await this.page.waitForLoadState("networkidle");
    }

    async setData(month: string, year: string, coutry: string){
        await this.paymentInfoLocator.waitFor();
        await this.expiryMonth.selectOption(month);
        await this.expiryYear.selectOption(year);
        await this.country.pressSequentially(coutry);
        

    }

    async getUserName(){
            const labelText = await this.paymentUserName.textContent();
            return (labelText?.trim());
    }
    async selectCountry(){
        await this.page.locator("button.ta-item").first().waitFor();
        await this.page.waitForSelector('button.ta-item', { timeout: 5000 });
        await this.page.locator("button.ta-item").filter({hasText:/\bIndia\b/}).click();
    }
}

module.exports={PaymentPage}