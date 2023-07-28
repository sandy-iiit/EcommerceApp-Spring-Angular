import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductDetailsComponent} from "../components/product-details/product-details.component";
import {ProductListComponent} from "../components/product-list/product-list.component";
import {CartDetailsComponent} from "../components/cart-details/cart-details.component";
import {CheckoutComponent} from "../components/checkout/checkout.component";



const routes:Routes=[
  {path:"products/:id",component:ProductDetailsComponent},
  {path:"search/:keyword",component:ProductListComponent},
  {path:"cart-details",component:CartDetailsComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"category/:id/:name",component:ProductListComponent},
  {path:"category",component:ProductListComponent},
  {path:"products",component:ProductListComponent},
  {path:"",redirectTo:"/products",pathMatch:"full"},
  {path:"**",redirectTo:"/products",pathMatch:"full"},
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule {

}
