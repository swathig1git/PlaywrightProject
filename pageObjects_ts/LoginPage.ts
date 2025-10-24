
import {Page, Locator} from "playwright-core";

export class LoginPage{
    page: Page;
    signInButton: Locator;
    userName: Locator;
    password: Locator;



    constructor(page:Page){
        this.page = page;
        this.signInButton =  page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async validLogin(userName: string, password: string){
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInButton.click();

    }


    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
}
