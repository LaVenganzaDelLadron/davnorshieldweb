import { Component } from '@angular/core';
import { SettingsComponent } from '../dashboard/portal-page.component';

@Component({selector: 'app-settings-page', standalone: true, imports: [SettingsComponent], template: '<section class="page-enter mx-auto max-w-7xl"><app-settings /></section>'})
export class SettingsPageComponent {}
