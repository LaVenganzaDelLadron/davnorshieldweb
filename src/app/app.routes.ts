import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './pages/layout/dashboard-layout/dashboard-layout.component';
import { Auth } from './pages/auth/auth';
import { Landing } from './pages/landing/landing';
import { Dashboard } from './pages/dashboard/dashboard';
import { CyberWeather } from './pages/cyber-weather/cyber-weather';
import { Heatmap } from './pages/heatmap/heatmap';
import { AiScanner } from './pages/ai-scanner/ai-scanner';
import { ScamReports } from './pages/scam-reports/scam-reports';
import { Alerts } from './pages/alerts/alerts';
import { Analytics } from './pages/analytics/analytics';
import { Municipalities } from './pages/municipalities/municipalities';
import { Barangays } from './pages/barangays/barangays';
import { Profile } from './pages/profile/profile';
import { Settings } from './pages/settings/settings';
import { Admin } from './pages/admin/admin';
import { Chat } from './pages/chat/chat';

export const routes: Routes = [
  { path: '', component: Landing, pathMatch: 'full' },
  { path: 'login', component: Auth, data: { mode: 'login' } },
  { path: 'register', component: Auth, data: { mode: 'register' } },
  { path: '', component: DashboardLayoutComponent, children: [
    { path: 'dashboard', component: Dashboard },
    { path: 'cyber-weather', component: CyberWeather },
    { path: 'heatmap', component: Heatmap },
    { path: 'scanner', component: AiScanner },
    { path: 'reports', component: ScamReports },
    { path: 'alerts', component: Alerts },
    { path: 'analytics', component: Analytics },
    { path: 'municipalities', component: Municipalities },
    { path: 'barangays', component: Barangays },
    { path: 'profile', component: Profile },
    { path: 'settings', component: Settings },
    { path: 'chat', component: Chat },
    { path: 'admin', component: Admin },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  ]},
  { path: '**', redirectTo: 'dashboard' }
];
