import { Component } from '@angular/core';
import { ReportsComponent } from '../dashboard/portal-page.component';

@Component({selector: 'app-scam-reports-page', standalone: true, imports: [ReportsComponent], template: '<section class="page-enter mx-auto max-w-7xl"><app-reports /></section>'})
export class ScamReportsPageComponent {}
