import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { endpoint } from '../pages/shared/api/api';
import { UserStorageService } from '../pages/auth/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticalService {

  constructor(private _http:HttpClient) { }

  getAnalysis(): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_ANALYTICS}`;
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
