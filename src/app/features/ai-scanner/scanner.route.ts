import { Routes } from '@angular/router';
export const SCANNER_ROUTES: Routes = [{ path: 'scanner', loadComponent: () => import('./scanner-page.component').then(m => m.ScannerPageComponent) }];
