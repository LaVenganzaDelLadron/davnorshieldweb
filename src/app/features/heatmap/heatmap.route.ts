import { Routes } from '@angular/router';
export const HEATMAP_ROUTES: Routes = [{ path: 'heatmap', loadComponent: () => import('./heatmap-page.component').then(m => m.HeatmapPageComponent) }];
