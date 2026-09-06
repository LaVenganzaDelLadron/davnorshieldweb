import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DashboardService } from '../../core/api/dashboard.service';
import { ReportsService } from '../../core/api/reports.service';
import { DashboardData, ThreatSummary } from '../../core/models/dashboard.model';
import { Report } from '../../core/models/report.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly dashboardService = inject(DashboardService);
  private readonly reportsService = inject(ReportsService);
  readonly lang = inject(LanguageService);

  data: DashboardData | null = null;
  threats: ThreatSummary[] = [];
  reports: Report[] = [];
  loading = true;
  error = '';

  constructor() {
    afterNextRender(() => this.loadData());
  }

  private loadData(): void {
    forkJoin({
      data: this.dashboardService.lguDashboard(),
      threats: this.dashboardService.topThreats(),
      reports: this.reportsService.getReports({ page: 1, pageSize: 3 }),
    }).subscribe({
      next: result => {
        this.data = result.data;
        this.threats = result.threats;
        this.reports = result.reports.items ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Dashboard data could not be loaded.';
        this.loading = false;
      },
    });
  }

  metric(label: string): number | string {
    const metric = this.data?.metrics.find(item => item.label.toLowerCase() === label.toLowerCase());
    return metric?.value ?? '—';
  }

  change(label: string): string {
    const metric = this.data?.metrics.find(item => item.label.toLowerCase() === label.toLowerCase());
    return metric?.change === undefined ? '' : `${metric.change > 0 ? '↗' : '↘'} ${Math.abs(metric.change)}%`;
  }

  reportTime(value: string): string {
    return value ? new Date(value).toLocaleString() : '—';
  }
}
