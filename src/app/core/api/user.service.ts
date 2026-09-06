import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { API_ENDPOINTS } from '../constants/api.constants';
import { PaginatedResponse, User, UserFilters } from '../models/user.model';
import { queryParams } from './api-utils';

@Injectable({
  providedIn:'root'
})

export class UserService {
  private http=inject(HttpClient);
  private url=environment.apiUrl+API_ENDPOINTS.USERS;

  getUsers(filters:UserFilters={}):Observable<PaginatedResponse<User>>{
    return this.http.get<PaginatedResponse<User>>(this.url,{params:queryParams(filters)});
  }

  getUser(id:string):Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`);
  }

  updateUser(id:string,body:Partial<User>):Observable<User>{
    return this.http.put<User>(`${this.url}/${id}`,body);
  }

  deleteUser(id:string):Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getByBarangay(barangayId:string,filters:UserFilters={}):Observable<PaginatedResponse<User>>{
    return this.http.get<PaginatedResponse<User>>(`${this.url}/barangay/${barangayId}`,{params:queryParams(filters)});
  }

  getByMunicipality(municipalityId:string,filters:UserFilters={}):Observable<PaginatedResponse<User>>{
    return this.http.get<PaginatedResponse<User>>(`${this.url}/municipality/${municipalityId}`,{params:queryParams(filters)});
  }
}
