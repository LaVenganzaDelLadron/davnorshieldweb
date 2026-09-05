import { Component } from '@angular/core';
import { BarangaysComponent } from '../dashboard/portal-page.component';

@Component({selector: 'app-barangays-page', standalone: true, imports: [BarangaysComponent], template: '<section class="page-enter mx-auto max-w-7xl"><app-barangays /></section>'})
export class BarangaysPageComponent {}
