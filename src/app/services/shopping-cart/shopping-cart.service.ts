import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';
import { ItShoppingCart } from 'src/app/interfaces/iShoppingCart.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated :new Date().getTime()
    })
  }
// ---------------
  private async getOrCreateCartid():Promise<string>{
    let cartID=localStorage.getItem('cartID');
    if(cartID) return cartID;

    let result = await this.create();
    localStorage.setItem('cartID',result.key);
    return result.key;
  }
  // ---------------
  getItem(cartID:string,productID:string){
    return this.db.object('/shopping-carts/'+cartID+'/items/'+productID);
  }
  // -----------------
  async getCart() : Promise<Observable<ItShoppingCart>>{
    let id= await this.getOrCreateCartid();

    return this.db.object('/shopping-carts/'+id).valueChanges().pipe(map(
      cart=> (cart) ? new ItShoppingCart(( cart as any).items): (cart as any)
         ))
  }
  // ---------------

  async AddToCart(product)
  {
    this.ToCart(product,1);
  }

  async removeFromCart(product){
    this.ToCart(product,-1);
  }

  async removeItem(product,q){
    this.ToCart(product,-q);
  }

  async addManual(product,q){
    this.ToaCart(product, q);
  }
  
  async clearCart(){
    let cartid= await this.getOrCreateCartid();
    this.db.object('/shopping-carts/'+cartid+'/items').remove();
  }
  
  
 

// ----------------
  async ToCart(product,change){
    let cartid= await this.getOrCreateCartid();
    let item$ = this.getItem(cartid,product.key);
  
    item$.snapshotChanges().pipe(take(1)).subscribe((item:any)=>{
      if(item.payload.exists()){
        let quantity = item.payload.val().quantity + change;
        if (quantity === 0){item$.remove();}else{
          item$.update({quantity: quantity});
        }
      }else{
        item$.update({
              title:product.payload.val().title,
              rate:product.payload.val().rate,
              price:product.payload.val().price,
              category:product.payload.val().category,
              imageUrl:product.payload.val().imageUrl,
               quantity:1 
        })
      }
    })
  }

  async ToaCart(product,change){
    let cartid= await this.getOrCreateCartid();
    let item$ = this.getItem(cartid,product.key);
  
    item$.snapshotChanges().pipe(take(1)).subscribe((item:any)=>{
      if(item.payload.exists()){
        let quantity = item.payload.val().quantity + change;
        if (quantity === 0){item$.remove();}else{
          item$.update({quantity: quantity});
        }
      }else{
        item$.update({
              title:product.title,
              rate:product.rate,
              price:product.price,
              category:product.category,
              imageUrl:product.imageUrl,
               quantity:1 
        })
      }
    })
  }

}
