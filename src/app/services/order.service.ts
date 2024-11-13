import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { endpoint } from '../pages/shared/api/api';
import { UserStorageService } from '../pages/auth/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }

  getPlaceOrders(): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_PLACE_ORDERS}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  changeOrderStatus(orderId: number, status: string): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.CHANGE_ORDER_STATUS}${orderId}/${status}`;
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
}
