import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserStorageService } from '../pages/auth/storage/user-storage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { endpoint } from '../pages/shared/api/api';

@Injectable({
  providedIn: 'root',
})
export class CustomerService implements OnInit {
  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

  getAllProducts(): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_ALL_CUSTOMERS}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductByName(name: string): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_ALL_CUSTOMER_BY_NAME}${name}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProductToCart(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };
    const requestUrl = `${environment.api}${endpoint.ADD_PRODUCT_TO_CART}`;
    return this._http.post(requestUrl, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCartByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this._http.get(
      `${environment.api}${endpoint.GET_CART_BY_USER_ID}${userId}`,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  increaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };
    const requestUrl = `${environment.api}${endpoint.INCREASE_PRODUCT_QUANTITY}`;
    return this._http.post(requestUrl, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  decreaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };
    const requestUrl = `${environment.api}${endpoint.DECREASE_PRODUCT_QUANTITY}`;
    return this._http.post(requestUrl, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  applyCouponByCode(code: any): Observable<any> {
    const userId = UserStorageService.getUserId();
    const requestUrl = `${environment.api}${endpoint.APPLY_COUPON}${userId}/${code}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  placeOrder(orderDto: any): Observable<any> {
    orderDto.userId = UserStorageService.getUserId();
    const requestUrl = `${environment.api}${endpoint.PLACE_ORDER}`;
    return this._http.post(requestUrl, orderDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrdersByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    const requestUrl = `${environment.api}${endpoint.GET_MY_ORDERS_BY_USER_ID}/${userId}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrderedProducts(orderId: number): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_MY_ORDERED_PRODUCTS}${orderId}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  giveReview(reviewDto: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GIVE_REVIEW}`;
    return this._http.post(requestUrl, reviewDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getProductDetailById(productId: number): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_PRODUCT}${productId}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProductToWishlist(wishlistDto: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.ADD_PRODUCT_TO_WISHLIST}`;
    return this._http.post(requestUrl, wishlistDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getWishlistByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    const requestUrl = `${environment.api}${endpoint.GET_WISHLIST_BY_USER_ID}${userId}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  getOrderByTrackingId(trackingId:number):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.ORDER_BY_TRACKING_ID}${trackingId}`;
    return this._http.get(requestUrl);
  }
}
