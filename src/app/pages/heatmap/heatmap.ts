import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeatmapService } from '../../core/api/heatmap.service';
import { HeatmapPoint } from '../../core/models/heatmap.model';

@Component({
  imports: [CommonModule],
  selector: 'app-heatmap',
  styleUrl: './heatmap.css',
  templateUrl: './heatmap.html',
})
export class Heatmap {
  private readonly service = inject(HeatmapService);
  points: HeatmapPoint[] = [];
  error = '';
  ngOnInit(): void {
    this.service.getMunicipalityHeatmap().subscribe({
      next: points => this.points = points,
      error: () => this.error = 'Heatmap data could not be loaded.',
    });
  }
}
