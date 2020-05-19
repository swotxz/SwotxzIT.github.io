import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  
  cart:any;
  cart$;

  constructor(private cartServ:ShoppingCartService) { }

  async ngOnInit() {
    var winH = $(window).height();
    $('.bgImage').height('100');


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
}
