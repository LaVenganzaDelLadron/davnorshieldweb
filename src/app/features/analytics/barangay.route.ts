import { Routes } from '@angular/router';
export const ANALYTICS_ROUTES: Routes = [{ path: 'analytics', loadComponent: () => import('./analytics-page.component').then(m => m.AnalyticsPageComponent) }];
