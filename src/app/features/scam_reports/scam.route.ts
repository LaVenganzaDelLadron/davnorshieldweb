import { Routes } from '@angular/router';
export const SCAM_REPORTS_ROUTES: Routes = [{ path: 'reports', loadComponent: () => import('./scam-reports-page.component').then(m => m.ScamReportsPageComponent) }];
