import { Routes } from '@angular/router';
export const MUNICIPALITIES_ROUTES: Routes = [{ path: 'municipalities', loadComponent: () => import('./municipalities-page.component').then(m => m.MunicipalitiesPageComponent) }];
