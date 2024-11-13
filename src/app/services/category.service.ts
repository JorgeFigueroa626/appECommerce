import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from '../pages/shared/api/api';
import { environment } from 'src/environments/environment';
import { UserStorageService } from '../pages/auth/storage/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  addCategory(categoryDto: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.CREATE_CATEGORY}`;
    return this._http.post(requestUrl, categoryDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCategories(): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_ALL_CATEGORIES}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getByCategoryId(categoryId: number): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_CATEGORY_ID}${categoryId}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateByCategoryId(categoryId: number, category: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_CATEGORY_ID}${categoryId}`;
    return this._http.put(requestUrl, category, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteByCategoryId(categoryId: number): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.GET_CATEGORY_ID}${categoryId}`;
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
