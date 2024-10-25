import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { CouponComponent } from './coupon/coupon.component';
import { PostCouponComponent } from './post-coupon/post-coupon.component';
import { OrdersComponent } from './orders/orders.component';
import { PostProductFaqComponent } from './post-product-faq/post-product-faq.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AnalitysComponent } from './analitys/analitys.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'product', component: ProductComponent},
  { path: 'product/:productId', component: UpdateProductComponent},
  { path: 'post-coupon', component: PostCouponComponent},
  { path: 'coupons', component: CouponComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'faq/:productId', component: PostProductFaqComponent},
  { path: 'analytics', component: AnalitysComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
