import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScannerService } from '../../core/api/scanner.service';
import { ScanResponse } from '../../core/models/scanner.model';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-ai-scanner',
  styleUrl: './ai-scanner.css',
  templateUrl: './ai-scanner.html',
})
export class AiScanner {
  private readonly scanner = inject(ScannerService);
  mode: 'url' | 'sms' | 'text' = 'url';
  value = '';
  sender = '';
  result: ScanResponse | null = null;
  loading = false;
  error = '';

  analyze(): void {
    const value = this.value.trim();
    if (!value) {
      this.error = 'Paste a link or message before analyzing.';
      return;
    }
    this.loading = true;
    this.error = '';
    const request = this.mode === 'url'
      ? this.scanner.scanURL({ url: value })
      : this.mode === 'sms'
        ? this.scanner.scanSMS({ message: value, sender: this.sender || undefined })
        : this.scanner.scanText({ text: value });
    request.subscribe({
      next: result => { this.result = result; this.loading = false; },
      error: () => { this.error = 'The scanner could not analyze this content. Please try again.'; this.loading = false; },
    });
  }
}
