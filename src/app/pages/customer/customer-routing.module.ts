import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ViewOrderedProductsComponent } from './view-ordered-products/view-ordered-products.component';
import { ReviewOrderedProductComponent } from './review-ordered-product/review-ordered-product.component';
import { ViewProductDetailComponent } from './view-product-detail/view-product-detail.component';
import { ViewWishlistComponent } from './view-wishlist/view-wishlist.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'my_orders', component: MyOrdersComponent },
  { path: 'ordered_products/:orderId', component: ViewOrderedProductsComponent },
  { path: 'review/:productId', component: ReviewOrderedProductComponent },
  { path: 'product/:productId', component: ViewProductDetailComponent},
  { path: 'wishlist', component: ViewWishlistComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
