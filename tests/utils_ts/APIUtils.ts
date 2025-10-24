 export interface Response  {
    token: string, 
    orderId: string} 

export interface LoginPayload{
  userEmail: string,
  userPassword: string
}

export interface order{
  country: string,
  productOrderedId: string
}
export interface CreateOrderPayload{
orders: order[]
}
export interface FakePayloadOrders{
  data:any[],
  message:string
}

export class APIUtils
{
    apiContext: any;
    loginPayload: string;

    constructor (apiContext: any, loginPayload: any)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken(){
            const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
                {data:this.loginPayload}
            );
        
            const loginResponseJson = await loginResponse.json();
            const token = await loginResponseJson.token;
            console.log("token =", token);
            return token;
    }

    async createOrder(createOrderPayload: any){
        let response :Response= {token:'', orderId:''};
        response.token = await this.getToken();
            const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data:createOrderPayload,
                    headers:{
                                'Authorization':response.token,
                                'Content-Tyoe':'application/json'
                    },
                }   
            );
        
        
        
        //Sample response for reference
        //{
        //    "orders": [
        //        "68f10754f669d6cb0a178f15"
        //    ],
        //    "productOrderId": [
        //        "68a961719320a140fe1ca57c"
        //    ],
        //    "message": "Order Placed Successfully"
        //}
            const orderResponseJson = await orderResponse.json();
            const orderId = await orderResponseJson.orders[0];
            response.orderId = orderId;
        
            console.log("orderId from API", orderId);

            return response;
    }
}
