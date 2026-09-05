import { Routes } from '@angular/router';
export const CYBER_WEATHER_ROUTES: Routes = [{ path: 'cyber-weather', loadComponent: () => import('./cyber-weather-page.component').then(m => m.CyberWeatherPageComponent) }];
