import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from '../services/products/product.service';
import { CategoriesService } from '../services/products/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit {

@Input('product') product:any;
@Input('shoppingCart') shoppingCart;

  constructor( private cartServ :ShoppingCartService,private catServ:CategoriesService,
    private route:ActivatedRoute,private router:Router,private prodServ:ProductService) { }

   ngOnInit() {
    $('.like1').css('display','none');
   }
  
  addToCart(){
    this.cartServ.AddToCart(this.product);
  }





  showProduct(id,url,title){
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    })
     
    swalWithBootstrapButtons.fire({
        text: title,
        html:`
          <img src="${url}" style="object-fit: contain; width:60%; height:70%">
          <h5> ${title} </h5>
        `,
      showCancelButton: true,
      confirmButtonText: 'Description',
      cancelButtonText: 'cancel',
      reverseButtons: true
      }).then((result) => {
      if (result.value) {
        this.router.navigate(['/description/'+id],{relativeTo:this.route})
      } else if ( result.dismiss === Swal.DismissReason.cancel) { }
    })
  }

  getQuantity(){
    if(!this.shoppingCart){ return 0;}
     let  item = this.shoppingCart.itemsMap[this.product.key];
      return item ? item.quantity:0;
  }
 
}
