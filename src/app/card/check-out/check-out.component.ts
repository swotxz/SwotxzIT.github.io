import { Component, OnInit } from '@angular/core';
import { ItShoppingCart } from 'src/app/interfaces/iShoppingCart.interface';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Order } from 'src/app/interfaces/order.interface';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

 
  userId:string;
  cart:ItShoppingCart;
  subscribe:Subscription;
  userSubscribe:Subscription;
  constructor(private sohpServ:ShoppingCartService,private orderServ:OrdersService,
    private autServ:AuthService,private router:Router,private route:ActivatedRoute) { }

 async ngOnInit() {
   let cart$ = await this.sohpServ.getCart();
   this.subscribe =  cart$.subscribe(cart=>{ this.cart=cart });
   this.userSubscribe =  this.autServ.user$.subscribe(user=>this.userId=user.uid)
  }

 async placeOrder(shipping){
    let order=new Order(this.userId,shipping,this.cart)
   let result=await this.orderServ.storeOrder(order);
   this.router.navigate(['/card/items'],{relativeTo:this.route});
  }
  
  editOrder(){
    this.router.navigate(['/card/items'],{relativeTo:this.route});
  }
  ngOnDestroy(){
    this.subscribe.unsubscribe();
    this.userSubscribe.unsubscribe();
  }



}
