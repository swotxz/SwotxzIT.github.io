// export class ItShoppingCart{
    
//     items:itShoppingItem[];
// }
// export class itShoppingItem{
//     product;
//     quantity:number;
// }


export class ItShoppingCart{
    
    items:itShoppingItem[]=[];
    constructor(public itemsMap:{[productId:string]:itShoppingItem}){
        this.itemsMap = itemsMap || {};
        for(let productID in itemsMap){
            let item=itemsMap[productID];
            // let x=new itShoppingItem();
            // Object.assign(x,item);
            this.items.push(new itShoppingItem({...item,key:productID}));
        }  
    }

    get totalPrice(){
        let sum=0;
        for(let productid in this.items){
            sum += this.items[productid].totalItemPrice;
        }
        return sum;
    }
    
    get getTotlCount()
    {
        let counter=0;
        for(let productID in this.itemsMap){
            counter +=this.itemsMap[productID].quantity;
        }
    return counter;
    }   
}

export class itShoppingItem{
    key:string;
    title:string;
    price:number;
    rate:string;
    category:string;
    imageUrl:string;
    quantity:number;

    constructor(init?:Partial<itShoppingItem>){
        Object.assign(this,init);
    }
    
   public get totalItemPrice(){
        return this.price * this.quantity;
    }
}
