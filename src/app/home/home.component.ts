import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { ProductService } from '../services/products/product.service';
import { CategoriesService } from '../services/products/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

declare var particlesJS: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


  
export class HomeComponent implements OnInit,OnDestroy {

  products:any[]=[];
  cart:any;
  subscribe:Subscription;
  showSpinner:boolean=true;
  
  constructor( private cartServ:ShoppingCartService,private prodServ :ProductService
    ,private catServ:CategoriesService,
    private route:ActivatedRoute,private router:Router) { 
     
      this.subscribe = prodServ.getAll().subscribe(
        product=>{this.products=product;
          this.showSpinner=false}
      )

    }

 async ngOnInit() {
    particlesJS.load('particles-js', 'assets/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });

    var winH = $(window).height();
    $('.header-section').height('670');

    var s =$('.header-section .btn-1');
     var n=80;
     s.click(function(){
        $('html , body').animate({
            scrollTop:$('#about').offset().top - n
        },1000);
     });

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
  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

}
