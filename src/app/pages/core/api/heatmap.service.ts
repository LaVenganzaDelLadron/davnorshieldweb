import { inject, Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 

import { environment } from '../../../../environment/environment'; 
import { API_ENDPOINTS } from '../constants/api.constants'; 
import { HeatmapPoint, HeatmapStatistics } from '../models/heatmap.model';

@Injectable({
    providedIn:'root'
}) 

export class HeatmapService {
    private http=inject(HttpClient);
    
    private url=environment.apiUrl+API_ENDPOINTS.HEATMAP; 
    
    getMunicipalityHeatmap():Observable<HeatmapPoint[]>{
        return this.http.get<HeatmapPoint[]>(this.url+'/municipality');
    } 
    
    getBarangayHeatmap():Observable<HeatmapPoint[]>{
        return this.http.get<HeatmapPoint[]>(this.url+'/barangay');
    } 
    
    getHeatmapStatistics():Observable<HeatmapStatistics>{
        return this.http.get<HeatmapStatistics>(this.url+'/statistics');
    }
}
