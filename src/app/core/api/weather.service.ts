import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { API_ENDPOINTS } from '../constants/api.constants';
import { CyberWeather } from '../models/weather.model';

@Injectable({
    providedIn:'root'
})

export class WeatherService {
    private http=inject(HttpClient);

    private url=environment.apiUrl+API_ENDPOINTS.WEATHER;

    todayWeather():Observable<CyberWeather>{
        return this.http.get<CyberWeather>(this.url+'/today');
    }

    municipalityWeather(id:string):Observable<CyberWeather>{
        return this.http.get<CyberWeather>(`${this.url}/municipality/${id}`);
    }

    barangayWeather(id:string):Observable<CyberWeather>{
        return this.http.get<CyberWeather>(`${this.url}/barangay/${id}`);
    }
}
