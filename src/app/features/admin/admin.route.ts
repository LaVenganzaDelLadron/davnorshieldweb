import { Routes } from '@angular/router';
export const ADMIN_ROUTES: Routes = [
  { path: 'admin/:section', loadComponent: () => import('./admin-page.component').then(m => m.AdminPageComponent) },
  { path: 'school-dashboard', loadComponent: () => import('./admin-page.component').then(m => m.AdminPageComponent) },
];
