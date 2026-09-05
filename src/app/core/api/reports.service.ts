import { inject, Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment'; 
import { API_ENDPOINTS } from '../constants/api.constants'; 
import { CreateReportRequest, Report, ReportFilters, ReportStatus } from '../models/report.model'; 
import { PaginatedResponse } from '../models/user.model'; import { queryParams } from './api-utils';

@Injectable({
    providedIn:'root'
}) 
export class ReportsService {
    private http=inject(HttpClient);

    private url=environment.apiUrl+API_ENDPOINTS.REPORTS; 
    createReport(body:CreateReportRequest):Observable<Report>{
        const form=new FormData();Object.entries(body).forEach(([k,v])=>{
            if(v!==undefined)form.append(k,v);
        });
        return this.http.post<Report>(this.url,form);
    } 
    
    getReports(filters:ReportFilters={}):Observable<PaginatedResponse<Report>>{
        return this.http.get<PaginatedResponse<Report>>(this.url,{params:queryParams(filters)});
    } 
    
    getReport(id:string):Observable<Report>{
        return this.http.get<Report>(`${this.url}/${id}`);
    } 
    
    updateStatus(id:string,status:ReportStatus):Observable<Report>{
        return this.http.patch<Report>(`${this.url}/${id}/status`,{status});
    } 
    
    deleteReport(id:string):Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    } 
    
    getBarangayReports(id:string,filters:ReportFilters={}):Observable<PaginatedResponse<Report>>{
        return this.http.get<PaginatedResponse<Report>>(`${this.url}/barangay/${id}`,{params:queryParams(filters)});
    } 
    
    getMunicipalityReports(id:string,filters:ReportFilters={}):Observable<PaginatedResponse<Report>>{
        return this.http.get<PaginatedResponse<Report>>(`${this.url}/municipality/${id}`,{params:queryParams(filters)});
    }
}
