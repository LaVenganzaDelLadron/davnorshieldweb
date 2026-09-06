import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { API_ENDPOINTS } from '../constants/api.constants';
import { QRScanRequest, SMSScanRequest, ScanResponse, TextScanRequest, URLScanRequest } from '../models/scanner.model';

@Injectable({
    providedIn:'root'
})
export class ScannerService {
    private http=inject(HttpClient);

    private url=environment.apiUrl+API_ENDPOINTS.SCANNER;

    scanURL(body:URLScanRequest):Observable<ScanResponse>{
        return this.http.post<ScanResponse>(this.url+'/url',body);
    }

    scanSMS(body:SMSScanRequest):Observable<ScanResponse>{
        return this.http.post<ScanResponse>(this.url+'/sms',body);
    }

    scanQR(body:QRScanRequest):Observable<ScanResponse>{
        const form=new FormData();form.append('image',body.image);
        return this.http.post<ScanResponse>(this.url+'/qr',form);
    }

    scanText(body:TextScanRequest):Observable<ScanResponse>{
        return this.http.post<ScanResponse>(this.url+'/text',body);
    }
}
