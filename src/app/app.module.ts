import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { FormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { CardComponent } from './card/card.component';
import { AdminProductsComponent } from './dashboard/admin-products/admin-products.component';
import { ProductsFormComponent } from './dashboard/products-form/products-form.component';
import { DataTablesModule } from 'angular-datatables';
import { ProductService } from './services/products/product.service';
import { CategoriesService } from './services/products/categories.service';
import { AddAdminComponent } from './dashboard/add-admin/add-admin.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UsersComponent } from './dashboard/users/users.component';
import { ContactsService } from './services/contact/contacts.service';
import { ContactsComponent } from './dashboard/contacts/contacts.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { SliderCarouselModule } from 'slider-carousel';
import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartItemsComponent } from './card/cart-items/cart-items.component';
import { CheckOutComponent } from './card/check-out/check-out.component';
import { OrdersService } from './services/orders/orders.service';
import { BrowserModule } from '@angular/platform-browser';
import { AdminOrderComponent } from './dashboard/admin-order/admin-order.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsComponent,
    LoginComponent,
    DashboardComponent,
    UserOrdersComponent,
    CardComponent,
    AdminProductsComponent,
    ProductsFormComponent,
    AddAdminComponent,
    ContactUsComponent,
    UsersComponent,
    ContactsComponent,
    ProductDescriptionComponent,
    ProductCardComponent,
    CartItemsComponent,
    CheckOutComponent,
    AdminOrderComponent,
    FooterComponent,
    AboutComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    DataTablesModule,
    SliderCarouselModule,
    BrowserAnimationsModule  
  ],
  providers: [AuthService,UserService,AuthGuard,
    AdminAuthGuard,
    ProductService,
    CategoriesService,
    ContactsService,
    ShoppingCartService,
    OrdersService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
