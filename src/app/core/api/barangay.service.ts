import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Barangay } from '../models/barangay.model';

@Injectable({
  providedIn: 'root',
})
export class BarangayService {
  private readonly http = inject(HttpClient);

  private readonly url = `${environment.apiUrl}${API_ENDPOINTS.BARANGAYS}`;

  /**
   * Get all barangays.
   */
  getBarangays(): Observable<Barangay[]> {
    return this.http.get<Barangay[]>(this.url);
  }

  /**
   * Get a single barangay by ID.
   */
  getBarangay(id: string): Observable<Barangay> {
    return this.http.get<Barangay>(`${this.url}/${id}`);
  }

  /**
   * Get all barangays under a municipality.
   */
  getBarangaysByMunicipality(
    municipalityId: string
  ): Observable<Barangay[]> {
    return this.http.get<Barangay[]>(
      `${this.url}/municipality/${municipalityId}`
    );
  }
}
