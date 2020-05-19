import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ProductService } from 'src/app/services/products/product.service';
import { appUsers } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal  from'sweetalert2';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  products:any[]=[];
  filteredProducts:any[]=[];
  Subscribe:Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();
   aUser:appUsers;
   subscribeAu:Subscription;
showSpinner:boolean=true;


  constructor(private AuthSer:AuthService,private uServ:UserService,private prodServ:ProductService,
    private route:ActivatedRoute,private router:Router) { 
  this.subscribeAu=  AuthSer.AppUser$.subscribe(user=>this.aUser=user);
    this.Subscribe =this.prodServ.getAll().subscribe(
      products=>{
        this.filteredProducts = this.products = products;
        this.dtTrigger.next();
        this.showSpinner=false;
      }
    );
  }
  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
  }
}

  filter(query:string){
    if(query){
      this.filteredProducts=this.products.filter(
        p=>p.payload.val().title.toLowerCase().includes(query.toLocaleLowerCase())
      )
    }else{ 
      this.filteredProducts=this.products;
    }
  }

  ngOnDestroy(){
    this.Subscribe.unsubscribe();
    this.subscribeAu.unsubscribe();
  } 

  info(){
    Swal.fire({
      title: 'Sorry 😔',
      text: 'You can not edit or remove any default item please try add new one then you can edit or remove it',
  
    })
    this.router.navigate(['/dashboard/products'],{relativeTo:this.route})
  }

}
