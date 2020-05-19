import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/products/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit,OnDestroy {

  product={};
  id;
  defImg='';
  showImg='';
  sub:Subscription;

  constructor(private prodServ :ProductService,private route :ActivatedRoute,private router:Router) { 
   this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
    this.sub= this.prodServ.getById(this.id).pipe(take(1)).subscribe(product=>{
        if(product){
          this.product = product;
        }
      })
    }  
  }

  ngOnInit() {
    var winH = $(window).height();
    $('.bgImage').height('100');
    
  } 
  imgFunc(url){
    this.showImg=url;
    this.defImg='s';
  }


  goBackHome(){
    this.router.navigate(['/'],{relativeTo:this.route});
  }
  goBackProducts(){
    this.router.navigate(['/products'],{relativeTo:this.route});
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
