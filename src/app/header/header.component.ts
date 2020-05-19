import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { appUsers } from '../interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs';
import { ItShoppingCart } from '../interfaces/iShoppingCart.interface';

@Component({
  selector: 'app-header', 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 appUser:appUsers;
//  shoppingCartCount=0;
cart$:Observable<ItShoppingCart>;
  constructor( private AuthSer:AuthService,private route:ActivatedRoute,
    private router:Router,private cartServ:ShoppingCartService) {
    AuthSer.AppUser$.subscribe(user=>this.appUser=user);
   }

 async ngOnInit() {
    $(window).scroll(function(){
      $('nav').toggleClass('scrolled',$(this).scrollTop() > 30);
  });
 
 $('.navbar .nav-item').click(function(){ 
     $('.navbar .nav-item').removeClass('active');
     $(this).addClass('active');});
     

     this.cart$ = await this.cartServ.getCart();
  }


  logout(){
   this.AuthSer.logout();
   this.router.navigate(['/login'],{relativeTo:this.route});
  }

  
}
