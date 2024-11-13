import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { endpoint } from '../pages/shared/api/api';
import { UserStorageService } from '../pages/auth/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }

  addProduct(productDto: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.CREATE_PRODUCT}`;
    return this._http.post(requestUrl, productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProducts(): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_ALL_PRODUCTS}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductsByName(name: string): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_BY_PRODUCT_NAME}${name}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }
  
  getByProductId(productId: string): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_BY_PRODUCT_ID}${productId}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateProductId(productId: any, productDto: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_BY_PRODUCT_ID}${productId}`;
    return this._http.put(requestUrl, productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }


  deleteByProductId(productId: number): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_BY_PRODUCT_ID}${productId}`;
    return this._http.delete(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createFaq(productId: number, faqDto: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.CREATE_FAQ_BY_PRODUCT_ID}${productId}`;
    return this._http.post(requestUrl, faqDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
