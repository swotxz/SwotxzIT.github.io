import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders/orders.service';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  orders$;
  property='';
  asd;
  constructor(private auth:AuthService,private order:OrdersService) { 
 this.asd=  this.orders$ = this.auth.user$.pipe(switchMap((user)=>order.getOrdersByUser(user.uid).snapshotChanges()));

  }

  ngOnInit() {
    var winH = $(window).height();
    $('.bgImage').height('100');
  }
  openUersInfo(order){
    this.property=order;
  }
  close(){
    this.property='';
  }

  removeOrder(p){
    this.order.removeOrder(p);
  }

  }



