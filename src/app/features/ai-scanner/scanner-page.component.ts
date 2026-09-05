import { Component } from '@angular/core';
import { ScannerComponent } from '../dashboard/portal-page.component';

@Component({selector: 'app-scanner-page', standalone: true, imports: [ScannerComponent], template: '<section class="page-enter mx-auto max-w-7xl"><app-scanner /></section>'})
export class ScannerPageComponent {}
