import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { API_ENDPOINTS } from '../constants/api.constants';
import { AuthResponse, ChangePasswordRequest, LoginRequest, RegisterRequest } from '../models/auth.model';
import { User } from '../models/user.model';
@Injectable({providedIn:'root'}) export class AuthService { private readonly http=inject(HttpClient); private readonly url=environment.apiUrl+API_ENDPOINTS.AUTH; private readonly key='davnorshield_token';
  /** Signs in and persists the access token. */ login(body:LoginRequest):Observable<AuthResponse>{return this.http.post<AuthResponse>(this.url+'/login',body).pipe(tap(x=>this.setToken(x.token.access_token)));}
  /** Creates an account and persists the returned access token. */ register(body:RegisterRequest):Observable<AuthResponse>{return this.http.post<AuthResponse>(this.url+'/register',body).pipe(tap(x=>this.setToken(x.token.access_token)));}
  /** Returns the authenticated user. */ me():Observable<User>{return this.http.get<User>(this.url+'/me');}
  /** Changes the current user's password. */ changePassword(body:ChangePasswordRequest):Observable<void>{return this.http.put<void>(this.url+'/change-password',body);}
  /** Deactivates the current account. */ deactivateAccount():Observable<void>{return this.http.delete<void>(this.url+'/deactivate-account');}
  /** Clears the browser session token. */ logout():void{localStorage.removeItem(this.key);}
  /** Returns the saved JWT, if present. */ getToken():string|null{return localStorage.getItem(this.key);}
  /** Indicates whether a JWT is available. */ isAuthenticated():boolean{return !!this.getToken();}
  private setToken(token:string):void{localStorage.setItem(this.key,token);}
}
