import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertsService } from '../../core/api/alerts.service';
import { BarangayService } from '../../core/api/barangay.service';
import { DashboardService } from '../../core/api/dashboard.service';
import { DashboardData, ThreatSummary } from '../../core/models/dashboard.model';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-landing',
  styleUrl: './landing.css',
  templateUrl: './landing.html',
})
export class Landing {
  private readonly dashboardService = inject(DashboardService);
  private readonly barangayService = inject(BarangayService);
  private readonly alertsService = inject(AlertsService);
  data: DashboardData | null = null;
  barangayCount = 0;
  alertsToday = 0;
  threats: ThreatSummary[] = [];
  loading = true;
  error = '';

  constructor() {
    afterNextRender(() => this.loadData());
  }

  private loadData(): void {
    forkJoin({
      data: this.dashboardService.lguDashboard(),
      barangays: this.barangayService.getBarangays(),
      alerts: this.alertsService.todayAlerts(),
      threats: this.dashboardService.topThreats(),
    }).subscribe({
      next: result => {
        this.data = result.data;
        this.barangayCount = result.barangays.length;
        this.alertsToday = result.alerts.length;
        this.threats = result.threats;
        this.loading = false;
      },
      error: () => {
        this.error = 'Community data could not be loaded.';
        this.loading = false;
      },
    });
  }

  metric(label: string): number | string {
    const item = this.data?.metrics.find(metric => metric.label.toLowerCase().includes(label.toLowerCase()));
    return item?.value ?? '—';
  }

  leadingThreat(): string {
    return this.threats[0]?.category ?? '—';
  }

  primaryMetricLabel(): string {
    return this.data?.metrics[0]?.label ?? 'Network metric';
  }

  primaryMetric(): number | string {
    return this.data?.metrics[0]?.value ?? '—';
  }
}
