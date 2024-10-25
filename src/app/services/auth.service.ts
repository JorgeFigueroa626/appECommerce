import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from 'src/app/pages/auth/storage/user-storage.service';
import { endpoint } from 'src/app/pages/shared/api/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  register(signupRequest:any):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.SIGN_UP}`;
    return this._http.post(requestUrl, signupRequest);
  }

  login(username: string, password:string):any{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {username, password};

    return this._http.post(`${environment.api}${endpoint.AUTHENTICATION}`, body, {headers, observe: 'response'}).pipe(
      map((resp) => {
        const token = resp.headers.get('authorization')?.substring(7);
        const user = resp.body;
        if (token && user) {
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;
      })
    )
  }


}
