class ProductsPage{
    constructor(page){
        this.page = page;
        this.allProductNames = page.locator(".card-body b");
        this.allProductCards = page.locator(".card-body");
        this.cart = page.locator(".btn.btn-custom").locator("text= Cart");
    }

    async addProductToCart(productName) {

    await this.allProductNames.last().waitFor();
    const products = await this.allProductNames.allTextContents();

    const count = products.length;
    for(let i=0; i<count; i++)
    {
        if (products[i] === productName)
        {
            await this.allProductCards.nth(i).locator("text= Add To Cart").click();
        }
    }

        
    }

    async viewCart(){
        await this.cart.click();
    }
}

module.exports = {ProductsPage}