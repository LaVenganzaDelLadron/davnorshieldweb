import { Component } from '@angular/core';
import { AdminComponent } from '../dashboard/portal-page.component';

@Component({selector: 'app-admin-page', standalone: true, imports: [AdminComponent], template: '<section class="page-enter mx-auto max-w-7xl"><app-admin /></section>'})
export class AdminPageComponent {}
