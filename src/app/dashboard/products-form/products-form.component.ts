import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { CategoriesService } from 'src/app/services/products/categories.service';
import { ProductService } from 'src/app/services/products/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { appUsers } from '../../interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import Swal  from'sweetalert2';
import { AdminProductsComponent } from '../admin-products/admin-products.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})

export class ProductsFormComponent implements OnInit {

  categories$;
  rate$;
  id;
  product={};
  isMode=true;
  aaUser={};



  constructor(private AuthSerr:AuthService, private cateServ:CategoriesService,private prodServ:ProductService,
    private route:ActivatedRoute,private router:Router) { 

    this.categories$=cateServ.getCategories();
    this.rate$=this.cateServ.getRate();
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.isMode=false;
    this.prodServ.getById(this.id).pipe(take(1)).subscribe(
        p =>{ if(p){
          this.product = p;
        }}
      )
    }
  
  }

  ngOnInit() {
    this.AuthSerr.AppUser$.subscribe(user=>{this.aaUser=user});
  }

  
  save(product){

    if(this.id){
      
    this.prodServ.update(this.id,product);
    }else{
      this.prodServ.create(product);
    }
    this.router.navigate(['/dashboard/products'],{relativeTo:this.route});
  
  }


  delete(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes , delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.prodServ.delete(this.id);
        this.router.navigate(['/dashboard/products'],{relativeTo:this.route});
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
        this.router.navigate(['/dashboard/products/id'],{relativeTo:this.route});
      }
    })
  }

  cancel(){
    this.router.navigate(['/dashboard/products'],{relativeTo:this.route});
  }

  
}
