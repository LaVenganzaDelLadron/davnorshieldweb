import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 

import { environment } from '../../../environment/environment'; 
import { API_ENDPOINTS } from '../constants/api.constants'; 
import { School, SchoolStats } from '../models/school.model';

@Injectable({
    providedIn:'root'
}) 
export class SchoolService {
    private http=inject(HttpClient);
    
    private url=environment.apiUrl+API_ENDPOINTS.SCHOOLS; 
    
    getSchools():Observable<School[]>{
        return this.http.get<School[]>(this.url);
    } 
    
    getSchool(id:string):Observable<School>{
        return this.http.get<School>(`${this.url}/${id}`);
    } 
    
    getStats():Observable<SchoolStats>{return this.http.get<SchoolStats>(this.url+'/stats');} updateAwarenessScore(score:number):Observable<SchoolStats>{
        return this.http.patch<SchoolStats>(this.url+'/awareness-score',{score});
    }
}
