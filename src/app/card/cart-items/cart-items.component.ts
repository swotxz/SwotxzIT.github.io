import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  cart:any;
  cart$;
  dis:Subscription;

  constructor(private cartServ:ShoppingCartService) { }

 async ngOnInit(){
   this.cart$ = await this.cartServ.getCart();
    ( await this.cartServ.getCart()).subscribe(
      cart=>{this.cart=cart;
      })
  }

  AddtoCart(p){
    this.cartServ.AddToCart(p);
      }
      getQuantity(p){
        if(!this.cart){ return 0;}
         let  item = this.cart.itemsMap[p.key];
          return item ? item.quantity:0;
      }
    
      removeFromCart(p){
        this.cartServ.removeFromCart(p);
      }

      removeItem(p,q){
        this.cartServ.removeItem(p,q);
      }
      clearAll(){
        this.cartServ.clearCart();
      }
      valChange(p,event){
        this.cartServ.addManual(p,event);
        // console.log(event.target.value);
      }

}
