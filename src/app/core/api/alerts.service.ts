import { inject, Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 

import { environment } from '../../../environment/environment'; 
import { API_ENDPOINTS } from '../constants/api.constants'; 
import { Alert, BroadcastAlertRequest } from '../models/alert.model';

@Injectable({
    providedIn:'root'
}) 
export class AlertsService {
    private http=inject(HttpClient);
    
    private url=environment.apiUrl+API_ENDPOINTS.ALERTS; 
    
    todayAlerts():Observable<Alert[]>{
        return this.http.get<Alert[]>(this.url+'/today');
    } 
    
    activeAlerts():Observable<Alert[]>{
        return this.http.get<Alert[]>(this.url+'/active');
    } 
    
    barangayAlerts(id:string):Observable<Alert[]>{
        return this.http.get<Alert[]>(`${this.url}/barangay/${id}`);
    } 
    
    municipalityAlerts(id:string):Observable<Alert[]>{
        return this.http.get<Alert[]>(`${this.url}/municipality/${id}`);
    } 
    
    broadcastAlert(body:BroadcastAlertRequest):Observable<Alert>{
        return this.http.post<Alert>(this.url+'/broadcast',body);
    }
}
