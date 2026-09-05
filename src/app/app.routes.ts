import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { AuthPageComponent } from './features/auth/auth-page.component';
import { LandingPageComponent } from './features/landing/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'login', component: AuthPageComponent, data: { mode: 'login' } },
  { path: 'register', component: AuthPageComponent, data: { mode: 'register' } },
  { path: '', component: DashboardLayoutComponent, children: [
    { path: 'dashboard', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'dashboard'} },
    { path: 'cyber-weather', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'weather'} },
    { path: 'heatmap', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'heatmap'} },
    { path: 'scanner', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'scanner'} },
    { path: 'reports', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'reports'} },
    { path: 'alerts', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'alerts'} },
    { path: 'analytics', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'analytics'} },
    { path: 'municipalities', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'municipalities'} },
    { path: 'barangays', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'barangays'} },
    { path: 'profile', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'profile'} },
    { path: 'settings', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'settings'} },
    { path: 'admin/:section', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'admin'} },
    { path: 'school-dashboard', loadComponent: () => import('./features/dashboard/portal-page.component').then(m => m.PortalPageComponent), data: {kind:'admin'} },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  ]},
  { path: '**', redirectTo: 'dashboard' }
];
