import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private db:AngularFireDatabase,private shopServ:ShoppingCartService) { }

  async storeOrder(order){
    let result =await  this.db.list('/orders').push(order);
    let result2 =await  this.db.list('/userOrder').push(order);
    this.shopServ.clearCart();
    return (`${result} , ${result2}`);
  }

  getOrder(){
    return this.db.list('/orders');
  }

  getOrdersByUser(userId:string){
    return this.db.list('/userOrder',ref=>{
     return ref.orderByChild('userId').equalTo(userId);
    });
  }


  removeOrder(id){
    return this.db.object('/userOrder/'+id).remove();
  }

  adminRemoveOrder(id){
    return this.db.object('/orders/'+id).remove();
  }


}
