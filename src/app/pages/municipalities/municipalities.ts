import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MunicipalityService } from '../../core/api/municipality.service';
import { Municipality, MunicipalitySummary } from '../../core/models/municipality.model';

@Component({
  imports: [CommonModule],
  selector: 'app-municipalities',
  styleUrl: './municipalities.css',
  templateUrl: './municipalities.html',
})
export class Municipalities {
  private readonly service = inject(MunicipalityService);
  municipalities: Municipality[] = [];
  summaries: MunicipalitySummary[] = [];
  loading = true;
  error = '';

  constructor() {
    afterNextRender(() => this.loadData());
  }

  private loadData(): void {
    forkJoin({
      municipalities: this.service.getMunicipalities(),
      summaries: this.service.getSummary(),
    }).subscribe({
      next: result => {
        this.municipalities = result.municipalities;
        this.summaries = result.summaries;
        this.loading = false;
      },
      error: () => {
        this.error = 'Municipality data could not be loaded.';
        this.loading = false;
      },
    });
  }

  summaryFor(id: string): MunicipalitySummary | undefined {
    return this.summaries.find(item => item.municipalityId === id);
  }

  riskClass(score?: number): string {
    if (score === undefined) return 'risk-info';
    return score >= 70 ? 'risk-high' : score >= 40 ? 'risk-medium' : 'risk-low';
  }

  riskLabel(score?: number): string {
    if (score === undefined) return 'UNKNOWN';
    return score >= 70 ? 'HIGH' : score >= 40 ? 'MEDIUM' : 'LOW';
  }
}
