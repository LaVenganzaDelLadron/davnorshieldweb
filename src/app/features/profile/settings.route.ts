import { Routes } from '@angular/router';
export const PROFILE_ROUTES: Routes = [
  { path: 'profile', loadComponent: () => import('./profile-page.component').then(m => m.ProfilePageComponent) },
  { path: 'settings', loadComponent: () => import('./settings-page.component').then(m => m.SettingsPageComponent) },
];
