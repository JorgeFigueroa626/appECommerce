import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material-module';
import { CartComponent } from './cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ViewOrderedProductsComponent } from './view-ordered-products/view-ordered-products.component';
import { ReviewOrderedProductComponent } from './review-ordered-product/review-ordered-product.component';
import { ViewProductDetailComponent } from './view-product-detail/view-product-detail.component';
import { ViewWishlistComponent } from './view-wishlist/view-wishlist.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CartComponent,
    PlaceOrderComponent,
    MyOrdersComponent,
    ViewOrderedProductsComponent,
    ReviewOrderedProductComponent,
    ViewProductDetailComponent,
    ViewWishlistComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class CustomerModule { }
