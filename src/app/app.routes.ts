import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { AuthPageComponent } from './features/auth/auth-page.component';
import { LandingPageComponent } from './features/landing/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'login', component: AuthPageComponent, data: { mode: 'login' } },
  { path: 'register', component: AuthPageComponent, data: { mode: 'register' } },
  { path: '', component: DashboardLayoutComponent, children: [
    { path: '', loadChildren: () => import('./features/dashboard/dashboard.route').then(m => m.DASHBOARD_ROUTES) },
    { path: '', loadChildren: () => import('./features/cyber_weather/weather.route').then(m => m.CYBER_WEATHER_ROUTES) },
    { path: '', loadChildren: () => import('./features/heatmap/heatmap.route').then(m => m.HEATMAP_ROUTES) },
    { path: '', loadChildren: () => import('./features/ai-scanner/scanner.route').then(m => m.SCANNER_ROUTES) },
    { path: '', loadChildren: () => import('./features/scam_reports/scam.route').then(m => m.SCAM_REPORTS_ROUTES) },
    { path: '', loadChildren: () => import('./features/alerts/alert.route').then(m => m.ALERTS_ROUTES) },
    { path: '', loadChildren: () => import('./features/analytics/barangay.route').then(m => m.ANALYTICS_ROUTES) },
    { path: '', loadChildren: () => import('./features/municipalities/municipality.route').then(m => m.MUNICIPALITIES_ROUTES) },
    { path: '', loadChildren: () => import('./features/barangays/barangay.routes').then(m => m.BARANGAYS_ROUTES) },
    { path: '', loadChildren: () => import('./features/profile/settings.route').then(m => m.PROFILE_ROUTES) },
    { path: '', loadChildren: () => import('./features/admin/admin.route').then(m => m.ADMIN_ROUTES) },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  ]},
  { path: '**', redirectTo: 'dashboard' }
];
