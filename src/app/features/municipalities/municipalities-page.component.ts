import { Component } from '@angular/core';
import { MunicipalitiesComponent } from '../dashboard/portal-page.component';

@Component({selector: 'app-municipalities-page', standalone: true, imports: [MunicipalitiesComponent], template: '<section class="page-enter mx-auto max-w-7xl"><app-municipalities /></section>'})
export class MunicipalitiesPageComponent {}
