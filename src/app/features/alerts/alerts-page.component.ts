import { Component } from '@angular/core';
import { AlertsComponent } from '../dashboard/portal-page.component';

@Component({selector: 'app-alerts-page', standalone: true, imports: [AlertsComponent], template: '<section class="page-enter mx-auto max-w-7xl"><app-alerts /></section>'})
export class AlertsPageComponent {}
