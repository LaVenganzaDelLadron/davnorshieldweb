import { Component } from '@angular/core';
import { ProfileComponent } from '../dashboard/portal-page.component';

@Component({selector: 'app-profile-page', standalone: true, imports: [ProfileComponent], template: '<section class="page-enter mx-auto max-w-7xl"><app-profile /></section>'})
export class ProfilePageComponent {}
