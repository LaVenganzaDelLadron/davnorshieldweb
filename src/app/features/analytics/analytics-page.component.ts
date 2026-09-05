import { Component } from '@angular/core';
import { AnalyticsComponent } from '../dashboard/portal-page.component';

@Component({selector: 'app-analytics-page', standalone: true, imports: [AnalyticsComponent], template: '<section class="page-enter mx-auto max-w-7xl"><app-analytics /></section>'})
export class AnalyticsPageComponent {}
