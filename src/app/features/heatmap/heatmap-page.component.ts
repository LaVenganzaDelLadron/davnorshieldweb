import { Component } from '@angular/core';
import { HeatmapComponent } from '../dashboard/portal-page.component';

@Component({selector: 'app-heatmap-page', standalone: true, imports: [HeatmapComponent], template: '<section class="page-enter mx-auto max-w-7xl"><app-heatmap /></section>'})
export class HeatmapPageComponent {}
