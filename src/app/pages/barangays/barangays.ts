import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarangayService } from '../../core/api/barangay.service';
import { Barangay } from '../../core/models/barangay.model';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-barangays',
  styleUrl: './barangays.css',
  templateUrl: './barangays.html',
})
export class Barangays {
  private readonly service = inject(BarangayService);
  barangays: Barangay[] = [];
  search = '';
  loading = true;
  error = '';

  constructor() {
    afterNextRender(() => this.loadBarangays());
  }

  loadBarangays(): void {
    this.loading = true;
    this.service.getBarangays().subscribe({
      next: barangays => {
        this.barangays = barangays;
        this.loading = false;
      },
      error: () => {
        this.error = 'Barangays could not be loaded.';
        this.loading = false;
      },
    });
  }

  get filteredBarangays(): Barangay[] {
    const value = this.search.trim().toLowerCase();
    return value ? this.barangays.filter(item => `${item.name} ${item.municipalityName ?? ''}`.toLowerCase().includes(value)) : this.barangays;
  }

  get highRiskCount(): number {
    return this.barangays.filter(item => (item.riskScore ?? 0) >= 70).length;
  }

  get reviewCount(): number {
    return this.barangays.filter(item => (item.riskScore ?? 0) >= 40 && (item.riskScore ?? 0) < 70).length;
  }

  riskLabel(score?: number): string {
    if (score === undefined) return 'UNKNOWN';
    return score >= 70 ? 'HIGH' : score >= 40 ? 'MEDIUM' : 'LOW';
  }

  riskClass(score?: number): string {
    if (score === undefined) return 'risk-info';
    return score >= 70 ? 'risk-high' : score >= 40 ? 'risk-medium' : 'risk-low';
  }
}
