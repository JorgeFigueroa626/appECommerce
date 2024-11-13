import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStorageService } from '../pages/auth/storage/user-storage.service';
import { endpoint } from '../pages/shared/api/api';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _http: HttpClient) {}

  // addCategory(categoryDto: any): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.CREATE_CATEGORY}`;
  //   return this._http.post(requestUrl, categoryDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // getAllCategorys(): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.GET_ALL_CATEGORYS}`;
  //   return this._http.get(requestUrl, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // addProduct(productDto: any): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.CREATE_PRODUCT}`;
  //   return this._http.post(requestUrl, productDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // getAllProducts(): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.GET_ALL_PRODUCTS}`;
  //   return this._http.get(requestUrl, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // getAllProductsByName(name: string): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.GET_BY_PRODUCT_NAME}${name}`;
  //   return this._http.get(requestUrl, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }
  
  // getByProductId(productId: string): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.GET_BY_PRODUCT_ID}${productId}`;
  //   return this._http.get(requestUrl, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // updateProductId(productId: any, productDto: any): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.GET_BY_PRODUCT_ID}${productId}`;
  //   return this._http.put(requestUrl, productDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }


  // deleteByProductId(productId: number): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.GET_BY_PRODUCT_ID}${productId}`;
  //   return this._http.delete(requestUrl, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // addCoupons(coupoDto: any): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.CREATE_COUPON}`;
  //   return this._http.post(requestUrl, coupoDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // getAllCoupons(): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.GET_COUPON}`;
  //   return this._http.get(requestUrl, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // getPlaceOrders(): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.GET_PLACE_ORDERS}`;
  //   return this._http.get(requestUrl, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // chageOrderStatus(orderId: number, status: string): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.CHANGE_ORDER_STATUS}${orderId}/${status}`;
  //   return this._http.get(requestUrl, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  
  // createFaq(productId: number, faqDto: any): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.CREATE_FAQ_BY_PRODUCT_ID}${productId}`;
  //   return this._http.post(requestUrl, faqDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }
  
  // getAnalitycs(): Observable<any> {
  //   const requestUrl = `${environment.api}${endpoint.GET_ANALYTICS}`;
  //   return this._http.get(requestUrl, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }
  
  // private createAuthorizationHeader(): HttpHeaders {
  //   return new HttpHeaders().set(
  //     'Authorization',
  //     'Bearer ' + UserStorageService.getToken()
  //   );
  // }
}
