import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { endpoint } from '../pages/shared/api/api';
import { UserStorageService } from '../pages/auth/storage/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor(private _http: HttpClient) {}

  addCoupons(couponDto: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.CREATE_COUPON}`;
    return this._http.post(requestUrl, couponDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCoupons(): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_COUPON}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getByCouponId(couponId: number): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_BY_COUPON_ID}${couponId}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateByCouponId(couponId: number, coupon: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_BY_COUPON_ID}${couponId}`;
    return this._http.put(requestUrl, coupon, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteByCouponId(couponId: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_BY_COUPON_ID}${couponId}`;
    return this._http.delete(requestUrl, {
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
