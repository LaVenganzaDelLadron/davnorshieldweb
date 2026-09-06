import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ReportsService } from '../../core/api/reports.service';
import { Report } from '../../core/models/report.model';

@Component({
  imports: [CommonModule, FormsModule, DatePipe],
  selector: 'app-scam-reports',
  styleUrl: './scam-reports.css',
  templateUrl: './scam-reports.html',
})
export class ScamReports {
  private readonly reportsService = inject(ReportsService);
  reports: Report[] = [];
  title = '';
  description = '';
  category = 'phishing';
  loading = false;
  error = '';
  success = '';

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportsService.getReports({ page: 1, pageSize: 20 }).subscribe({
      next: response => this.reports = response.items ?? [],
      error: () => this.error = 'Reports could not be loaded.',
    });
  }

  submit(): void {
    if (!this.title.trim() || !this.description.trim()) {
      this.error = 'Add a title and description before submitting.';
      return;
    }
    this.loading = true;
    this.error = '';
    this.reportsService.createReport({ title: this.title, description: this.description, category: this.category }).subscribe({
      next: report => {
        this.reports = [report, ...this.reports];
        this.title = '';
        this.description = '';
        this.success = 'Your report was submitted successfully.';
        this.loading = false;
      },
      error: () => { this.error = 'The report could not be submitted.'; this.loading = false; },
    });
  }
}
