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
import { AnalityComponent } from './anality/anality.component';
import { OrderByStatusComponent } from './anality/order-by-status/order-by-status.component';
import { CategoryManagerComponent } from './category/category-manager/category-manager.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';


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
    AnalityComponent,
    OrderByStatusComponent,
    CategoryManagerComponent,
    CategoryListComponent,
    ProductListComponent
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
