import { ItShoppingCart } from './iShoppingCart.interface';


export class Order{
    datePlaced:number;
    items:any[];
    constructor(public userId:string,public shipping:any,shoppingCart:ItShoppingCart){
        this.datePlaced=new Date().getTime();
        this.items=shoppingCart.items.map(i=>{
            return{
                product :{
                  title:i.title,
                  imageUrl:i.imageUrl,
                  price:i.price,
                  rate:i.rate
                },
                quantity:i.quantity,
                totalPrice:i.totalItemPrice
              }
        })
    }
}
