import { CommonModule } from '@angular/common';
import { afterNextRender, Component, Input, inject } from '@angular/core';
import { HeatmapService } from '../../../core/api/heatmap.service';
import { ReportsService } from '../../../core/api/reports.service';
import { HeatmapPoint } from '../../../core/models/heatmap.model';
import { Report } from '../../../core/models/report.model';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `<header class="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p class="eyebrow">Davao del Norte · threat intelligence</p><h1 class="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">{{ title }}</h1><p class="mt-2 text-sm text-slate-400">{{ subtitle }}</p></div></header>`,
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
}

@Component({
  selector: 'app-threat-chart',
  standalone: true,
  template: `<article class="cyber-card p-5"><div class="flex items-start justify-between"><div><h3 class="font-semibold text-white">{{ title }}</h3><p class="mt-1 text-xs text-slate-500">Live community intelligence</p></div></div><p class="mt-6 text-sm text-slate-500">Trend data is not available from the current API.</p></article>`,
})
export class ThreatChartComponent {
  @Input() title = 'Threat trend';
}

@Component({
  selector: 'app-threat-map',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="map-surface grid-bg"><div class="map-label">DAVAO DEL NORTE<br/><span>INCIDENT LAYER</span></div>@if (loading) {<p class="muted">Loading map data...</p>}@if (error) {<p class="field-error">{{ error }}</p>}@for (point of points; track point.areaId) {<div class="marker warning" [style.left.%]="point.longitude" [style.top.%]="point.latitude"><b>{{ point.reportCount }}</b><small>{{ point.areaName }}</small></div>}@empty { @if (!loading) {<p class="muted">No map data returned by the API.</p>} }</div>`,
})
export class ThreatMapComponent {
  private readonly heatmap = inject(HeatmapService);
  points: HeatmapPoint[] = [];
  loading = true;
  error = '';

  constructor() {
    afterNextRender(() => {
      this.heatmap.getMunicipalityHeatmap().subscribe({
        next: points => { this.points = points; this.loading = false; },
        error: () => { this.error = 'Map data could not be loaded.'; this.loading = false; },
      });
    });
  }
}

@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [CommonModule],
  template: `<article class="cyber-card overflow-hidden"><div class="flex items-center justify-between p-5"><div><h3 class="font-semibold text-white">Recent scam reports</h3><p class="mt-1 text-xs text-slate-500">Community reports returned by the API</p></div></div>@if (loading) {<p class="p-5 text-sm text-slate-500">Loading reports...</p>}@if (error) {<p class="p-5 text-sm text-rose-300">{{ error }}</p>}<div class="overflow-x-auto"><table class="w-full min-w-165 text-left text-sm"><thead><tr><th>Reporter</th><th>Municipality</th><th>Threat type</th><th>Status</th><th>Risk</th></tr></thead><tbody>@for (report of reports; track report.id) {<tr><td class="font-medium text-slate-200">{{ report.reporterId || 'Unavailable' }}</td><td>{{ report.municipalityId || 'Unavailable' }}</td><td>{{ report.category }}</td><td><span class="pill risk-info">{{ report.status }}</span></td><td><span class="pill risk-medium">{{ report.risk }}</span></td></tr>} @empty { @if (!loading) {<tr><td colspan="5" class="p-5 text-slate-500">No reports returned by the API.</td></tr>} }</tbody></table></div></article>`,
})
export class ReportTableComponent {
  private readonly reportsService = inject(ReportsService);
  reports: Report[] = [];
  loading = true;
  error = '';

  constructor() {
    afterNextRender(() => {
      this.reportsService.getReports({ page: 1, pageSize: 20 }).subscribe({
        next: response => { this.reports = response.items ?? []; this.loading = false; },
        error: () => { this.error = 'Reports could not be loaded.'; this.loading = false; },
      });
    });
  }
}
