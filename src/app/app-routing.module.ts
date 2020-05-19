import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { CardComponent } from './card/card.component';
import { ProductsFormComponent } from './dashboard/products-form/products-form.component';
import { AdminProductsComponent } from './dashboard/admin-products/admin-products.component';
import { AddAdminComponent } from './dashboard/add-admin/add-admin.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UsersComponent } from './dashboard/users/users.component';
import { ContactsComponent } from './dashboard/contacts/contacts.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { CartItemsComponent } from './card/cart-items/cart-items.component';
import { CheckOutComponent } from './card/check-out/check-out.component';
import { AdminOrderComponent } from './dashboard/admin-order/admin-order.component';
import { AboutComponent } from './about/about.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'description/:id',component:ProductDescriptionComponent},
  {path:'login',component:LoginComponent},
  {path:'card',component:CardComponent,children:[
    { path: '' ,redirectTo: 'items', pathMatch: 'full' },
    { path: 'items', component:CartItemsComponent},
    { path: 'check-out', component:CheckOutComponent,canActivate:[AuthGuard]},
  ]},
  {path:'contact-us',component:ContactUsComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard,AdminAuthGuard],
  children: [
    { path: '' ,redirectTo: 'new', pathMatch: 'full' },
    { path: 'new', component:ProductsFormComponent},
    { path: 'products', component:AdminProductsComponent },
    { path: 'products/:id', component:ProductsFormComponent },
    { path: 'add-admin', component:AddAdminComponent },
    { path: 'users', component:UsersComponent },
    { path: 'contacts', component:ContactsComponent },
    { path: 'orders', component:AdminOrderComponent },
    { path: ':anything', redirectTo: 'new', pathMatch: 'full' },
    ]
  },
  
  {path:'userorders',component:UserOrdersComponent,canActivate:[AuthGuard]},
  {path:'about',component:AboutComponent},
  {path:':anything',redirectTo: '', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
