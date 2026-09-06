import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Municipality, MunicipalitySummary } from '../models/municipality.model';

@Injectable({
    providedIn:'root'
})
export class MunicipalityService {
    private http=inject(HttpClient);

    private url=environment.apiUrl+API_ENDPOINTS.MUNICIPALITIES;

    getMunicipalities():Observable<Municipality[]>{
        return this.http.get<Municipality[]>(this.url);
    }
    getMunicipality(id:string):Observable<Municipality>{
        return this.http.get<Municipality>(`${this.url}/${id}`);
    }
    getSummary():Observable<MunicipalitySummary[]>{
        return this.http.get<MunicipalitySummary[]>(this.url+'/summary');
    }
}
