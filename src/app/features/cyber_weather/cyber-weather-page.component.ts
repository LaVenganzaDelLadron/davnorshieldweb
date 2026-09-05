import { Component } from '@angular/core';
import { WeatherComponent } from '../dashboard/portal-page.component';

@Component({selector: 'app-cyber-weather-page', standalone: true, imports: [WeatherComponent], template: '<section class="page-enter mx-auto max-w-7xl"><app-weather /></section>'})
export class CyberWeatherPageComponent {}
