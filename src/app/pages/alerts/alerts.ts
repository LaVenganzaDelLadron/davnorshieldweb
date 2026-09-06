import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlertsService } from '../../core/api/alerts.service';
import { Alert } from '../../core/models/alert.model';

@Component({
  imports: [CommonModule, DatePipe],
  selector: 'app-alerts',
  styleUrl: './alerts.css',
  templateUrl: './alerts.html',
})
export class Alerts {
  private readonly service = inject(AlertsService);
  alerts: Alert[] = [];
  loading = true;
  error = '';
  ngOnInit(): void {
    this.service.activeAlerts().subscribe({
      next: alerts => { this.alerts = alerts; this.loading = false; },
      error: () => { this.error = 'Alerts could not be loaded.'; this.loading = false; },
    });
  }
}
