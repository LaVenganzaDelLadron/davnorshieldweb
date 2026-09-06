import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DashboardService } from '../../core/api/dashboard.service';
import { DashboardData, ThreatSummary } from '../../core/models/dashboard.model';

@Component({
  imports: [CommonModule],
  selector: 'app-analytics',
  styleUrl: './analytics.css',
  templateUrl: './analytics.html',
})
export class Analytics {
  private readonly dashboardService = inject(DashboardService);
  data: DashboardData | null = null;
  threats: ThreatSummary[] = [];
  loading = true;
  error = '';

  constructor() {
    afterNextRender(() => this.loadData());
  }

  private loadData(): void {
    forkJoin({
      data: this.dashboardService.analytics(),
      threats: this.dashboardService.topThreats(),
    }).subscribe({
      next: result => {
        this.data = result.data;
        this.threats = result.threats;
        this.loading = false;
      },
      error: () => {
        this.error = 'Analytics data could not be loaded.';
        this.loading = false;
      },
    });
  }
}
