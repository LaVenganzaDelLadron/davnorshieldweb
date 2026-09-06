import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { forkJoin, of, switchMap } from 'rxjs';
import { MunicipalityService } from '../../core/api/municipality.service';
import { WeatherService } from '../../core/api/weather.service';
import { CyberWeather as CyberWeatherData } from '../../core/models/weather.model';

@Component({
  imports: [CommonModule],
  selector: 'app-cyber-weather',
  styleUrl: './cyber-weather.css',
  templateUrl: './cyber-weather.html',
})
export class CyberWeather {
  private readonly weatherService = inject(WeatherService);
  private readonly municipalityService = inject(MunicipalityService);
  weather: CyberWeatherData | null = null;
  municipalityWeather: CyberWeatherData[] = [];
  loading = true;
  error = '';

  constructor() {
    afterNextRender(() => this.loadData());
  }

  private loadData(): void {
    forkJoin({
      weather: this.weatherService.todayWeather(),
      municipalities: this.municipalityService.getMunicipalities(),
    }).pipe(
      switchMap(result => {
        const requests = result.municipalities.map(item => this.weatherService.municipalityWeather(item.id));
        return forkJoin({ weather: of(result.weather), municipalityWeather: requests.length ? forkJoin(requests) : of([] as CyberWeatherData[]) });
      }),
    ).subscribe({
      next: result => {
        this.weather = result.weather;
        this.municipalityWeather = result.municipalityWeather;
        this.loading = false;
      },
      error: () => {
        this.error = 'Cyber weather data could not be loaded.';
        this.loading = false;
      },
    });
  }

  riskClass(level: string): string {
    return level === 'high' || level === 'critical' ? 'risk-high' : level === 'medium' ? 'risk-medium' : 'risk-low';
  }
}
