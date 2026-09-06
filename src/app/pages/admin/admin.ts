import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AlertsService } from '../../core/api/alerts.service';
import { DashboardService } from '../../core/api/dashboard.service';
import { Alert } from '../../core/models/alert.model';
import { DashboardData, Outbreak } from '../../core/models/dashboard.model';
import { ThreatLevel } from '../../core/constants/threat.constants';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin {
  private readonly dashboardService = inject(DashboardService);
  private readonly alertsService = inject(AlertsService);
  data: DashboardData | null = null;
  alerts: Alert[] = [];
  outbreaks: Outbreak[] = [];
  loading = true;
  error = '';
  alertTitle = '';
  alertMessage = '';
  alertSeverity: ThreatLevel = 'medium';
  showAlertForm = false;
  submitting = false;

  constructor() {
    afterNextRender(() => this.loadData());
  }

  private loadData(): void {
    forkJoin({
      data: this.dashboardService.adminDashboard(),
      alerts: this.alertsService.activeAlerts(),
      outbreaks: this.dashboardService.outbreaks(),
    }).subscribe({
      next: result => {
        this.data = result.data;
        this.alerts = result.alerts;
        this.outbreaks = result.outbreaks;
        this.loading = false;
      },
      error: () => {
        this.error = 'Administration data could not be loaded.';
        this.loading = false;
      },
    });
  }

  broadcastAlert(): void {
    if (!this.alertTitle.trim() || !this.alertMessage.trim() || this.submitting) return;
    this.submitting = true;
    this.error = '';
    this.alertsService.broadcastAlert({
      title: this.alertTitle.trim(),
      message: this.alertMessage.trim(),
      severity: this.alertSeverity,
    }).subscribe({
      next: alert => {
        this.alerts = [alert, ...this.alerts];
        this.alertTitle = '';
        this.alertMessage = '';
        this.showAlertForm = false;
        this.submitting = false;
      },
      error: () => {
        this.error = 'The alert could not be broadcast.';
        this.submitting = false;
      },
    });
  }
}
