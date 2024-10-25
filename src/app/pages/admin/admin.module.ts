import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material-module';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { CouponComponent } from './coupon/coupon.component';
import { PostCouponComponent } from './post-coupon/post-coupon.component';
import { OrdersComponent } from './orders/orders.component';
import { PostProductFaqComponent } from './post-product-faq/post-product-faq.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AnalitysComponent } from './analitys/analitys.component';
import { OrderByStatusComponent } from './analitys/order-by-status/order-by-status.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    CouponComponent,
    PostCouponComponent,
    OrdersComponent,
    PostProductFaqComponent,
    UpdateProductComponent,
    AnalitysComponent,
    OrderByStatusComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class AdminModule { }
