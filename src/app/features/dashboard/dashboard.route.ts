import { Routes } from '@angular/router';
export const DASHBOARD_ROUTES: Routes = [{ path: 'dashboard', loadComponent: () => import('./dashboard-page.component').then(m => m.DashboardPageComponent) }];
