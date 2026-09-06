import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AlertsService } from '../../core/api/alerts.service';
import { SchoolService } from '../../core/api/school.service';
import { Alert } from '../../core/models/alert.model';
import { School, SchoolStats } from '../../core/models/school.model';

@Component({
  imports: [CommonModule],
  selector: 'app-school-dashboard',
  styleUrl: './school-dashboard.css',
  templateUrl: './school-dashboard.html',
})
export class SchoolDashboard {
  private readonly schoolService = inject(SchoolService);
  private readonly alertsService = inject(AlertsService);
  stats: SchoolStats | null = null;
  schools: School[] = [];
  alerts: Alert[] = [];
  loading = true;
  error = '';

  constructor() {
    afterNextRender(() => this.loadData());
  }

  private loadData(): void {
    forkJoin({
      stats: this.schoolService.getStats(),
      schools: this.schoolService.getSchools(),
      alerts: this.alertsService.activeAlerts(),
    }).subscribe({
      next: result => {
        this.stats = result.stats;
        this.schools = result.schools;
        this.alerts = result.alerts;
        this.loading = false;
      },
      error: () => {
        this.error = 'School dashboard data could not be loaded.';
        this.loading = false;
      },
    });
  }
}
