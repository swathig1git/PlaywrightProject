
class LoginPage{
    constructor({page}){
        this.page = page;
        this.signInButton =  page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async validLogin(userName, password){
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInButton.click();

    }


    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
}

module.exports = {LoginPage};