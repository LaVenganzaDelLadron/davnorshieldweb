import { Component } from '@angular/core';
import { DashboardComponent } from './portal-page.component';

/** Route-level dashboard screen. Keeps dashboard routing independent of other domains. */
@Component({
  selector: 'app-dashboard-page', standalone: true, imports: [DashboardComponent],
  template: '<section class="page-enter mx-auto max-w-7xl"><app-dashboard /></section>',
})
export class DashboardPageComponent {}
