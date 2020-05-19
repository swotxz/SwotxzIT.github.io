import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/products/product.service';
import { CategoriesService } from '../services/products/categories.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit ,OnDestroy{

  products:any[]=[];
  filterProducts:any[]=[];
  SearchProducts:any[]=[];
  SortProducts:any[]=[];
  categories$;
  category='';
  search='';
  minSearch='';
  rate='';
  showSpinner:boolean=true;
  cart:any;
  subscribe:Subscription;

  constructor( private cartServ:ShoppingCartService,private prodServ :ProductService,private catServ:CategoriesService,
    private route:ActivatedRoute,private router:Router ) {
   this.subscribe = prodServ.getAll().pipe(switchMap(
      products=>{this.products=products;
      return this.route.queryParamMap;}
    )).subscribe(params=>{
      this.category=params.get('category');
      this.rate = params.get('rate');
      if(this.category && this.rate){
        this.SearchProducts = this.filterProducts= this.products.filter( p =>
          (p.payload.val().category === this.category) && (p.payload.val().rate === this.rate));
      }else if(this.category || this.rate){
        this.SearchProducts = this.filterProducts= this.products.filter( p =>
          (p.payload.val().category === this.category) || (p.payload.val().rate === this.rate));
      }else{
        this.SearchProducts = this.filterProducts =  this.products;
      }
      this.showSpinner=false;
   })
   this.categories$ =catServ.getCategories();
   }

 async ngOnInit() {
    var winH = $(window).height();
    $('.bgImage').height('100');

    $(window).scroll(function(){
      if($(this).scrollTop() > 400){
         $('.topbtn').fadeIn(); 
      }else{
          $('.topbtn').fadeOut(); 
      } 
      });
      
      $('.topbtn').click(function(){
          $('html , body').animate({scrollTop:0},800);
      });



    ( await this.cartServ.getCart()).subscribe(
      cart=>{this.cart=cart;
      })

  }

  
  filter(query:string){
    if(query){
      this.search=query;
       this.SearchProducts=this.filterProducts.filter(
        p=>p.payload.val().title.toLowerCase().includes(query.toLocaleLowerCase())
      )
    }else{ 
         this.SearchProducts=this.filterProducts;
    }
  }

  
  
  minfilter(query1:string){
    if(query1){
      this.minSearch=query1;
       this.SearchProducts=this.filterProducts.filter(
        p=>p.payload.val().title.toLowerCase().includes(query1.toLocaleLowerCase())
      )
    }else{ 
         this.SearchProducts=this.filterProducts;
    }
  }

  onSelectChange(deviceValue){
   if(deviceValue ==='LTH'){
      this.SearchProducts.sort((a,b)=>a.payload.val().price-b.payload.val().price)
    }else if(deviceValue ==='HTL'){
    this.SearchProducts.sort((a,b)=>b.payload.val().price-a.payload.val().price)
    }else{
      this.SearchProducts.sort((a,b)=>0.5-Math.random())
    }
}
  
ngOnDestroy(){
  this.subscribe.unsubscribe();
}

}
 