import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 

import { environment } from '../../../../environment/environment'; 
import { API_ENDPOINTS } from '../constants/api.constants';
import { DashboardData, Outbreak, ThreatSummary } from '../models/dashboard.model';

@Injectable({
    providedIn:'root'
}) 
export class DashboardService {
    private http=inject(HttpClient);
    
    private url=environment.apiUrl+API_ENDPOINTS.DASHBOARD; 
    
    adminDashboard():Observable<DashboardData>{
        return this.http.get<DashboardData>(this.url+'/admin');
    } 
    
    lguDashboard():Observable<DashboardData>{
        return this.http.get<DashboardData>(this.url+'/lgu');
    } 
    
    analytics():Observable<DashboardData>{
        return this.http.get<DashboardData>(this.url+'/analytics');
    } 
    
    topThreats():Observable<ThreatSummary[]>{
        return this.http.get<ThreatSummary[]>(this.url+'/top-threats');
    } 
    
    outbreaks():Observable<Outbreak[]>{
        return this.http.get<Outbreak[]>(this.url+'/outbreaks');
    }
}
