import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/api/auth.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings {
  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  saving = false;
  error = '';
  success = '';
  readonly passwordForm = this.formBuilder.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  changePassword(): void {
    if (this.passwordForm.invalid || this.saving) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.saving = true;
    this.error = '';
    this.success = '';
    const { currentPassword, newPassword } = this.passwordForm.getRawValue();
    this.auth.changePassword({ currentPassword: currentPassword ?? '', newPassword: newPassword ?? '' }).subscribe({
      next: () => {
        this.success = 'Password updated.';
        this.passwordForm.reset();
        this.saving = false;
      },
      error: () => {
        this.error = 'Password could not be updated.';
        this.saving = false;
      },
    });
  }
}
