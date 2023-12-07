import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { UpdateSellerProductComponent } from './update-seller-product/update-seller-product.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full'},
  {path:'home', component:HomeComponent},
  {path:'seller', component:SellerComponent},
  {path:'seller-home', component:SellerHomeComponent, canActivate:[AuthGuard]},
  {path:'seller-add-product', component:SellerAddProductComponent, canActivate:[AuthGuard]},
  {path:'update-seller-product/:id', component:UpdateSellerProductComponent, canActivate:[AuthGuard]},
  {path:'search/:query', component:SearchComponent},
  {path:'details/:productId', component:DetailsComponent},
  {path:'user-auth', component:UserAuthComponent},
  {path:'cart', component:CartComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'my-order', component:MyOrderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
