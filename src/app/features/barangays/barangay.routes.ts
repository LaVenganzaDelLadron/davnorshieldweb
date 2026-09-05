import { Routes } from '@angular/router';
export const BARANGAYS_ROUTES: Routes = [{ path: 'barangays', loadComponent: () => import('./barangays-page.component').then(m => m.BarangaysPageComponent) }];
