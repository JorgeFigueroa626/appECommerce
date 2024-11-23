import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { CouponComponent } from './coupon/coupon.component';
import { PostCouponComponent } from './post-coupon/post-coupon.component';
import { OrdersComponent } from './orders/orders.component';
import { PostProductFaqComponent } from './post-product-faq/post-product-faq.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AnalityComponent } from './anality/anality.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryManagerComponent } from './category/category-manager/category-manager.component';
import { ProductListComponent } from './product/product-list/product-list.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  // { path: 'category', component: CategoryComponent},

  { path: 'category-list', component: CategoryListComponent},
  { path: 'category/:categoryId', component: CategoryManagerComponent},
  
  { path: 'product-list', component: ProductListComponent},
  { path: 'product', component: ProductComponent},
  { path: 'product/:productId', component: UpdateProductComponent},
  
  { path: 'post-coupon', component: PostCouponComponent},
  { path: 'coupons', component: CouponComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'faq/:productId', component: PostProductFaqComponent},
  { path: 'analytics', component: AnalityComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
