import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

 
  orders:any;
  property='';
  constructor(private auth:AuthService,private order:OrdersService) { 
    order.getOrder().snapshotChanges().subscribe(
      orders=>this.orders=orders
    );

  }

  ngOnInit() {
 
  }
  openUersInfo(order){
    this.property=order;
  }
  close(){
    this.property='';
  }

  removeOrder(p){
    this.order.adminRemoveOrder(p);
  }


}
