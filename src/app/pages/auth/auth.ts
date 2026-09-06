import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/api/auth.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-auth',
  styleUrl: './auth.css',
  templateUrl: './auth.html',
})
export class Auth {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isRegister = this.route.snapshot.data['mode'] === 'register';
  submitting = false;
  errorMessage = '';
  successMessage = '';

  readonly form = this.formBuilder.group({
    full_name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor() {
    if (this.isRegister) {
      this.form.controls.full_name.addValidators([Validators.required, Validators.minLength(2)]);
    }
  }

  submit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const { email, password, full_name } = this.form.getRawValue();
    const request = this.isRegister
      ? this.authService.register({
          full_name: full_name ?? '',
          email: email ?? '',
          password: password ?? '',
          role: 'citizen',
        })
      : this.authService.login({ email: email ?? '', password: password ?? '' });

    request.subscribe({
      next: () => {
        this.successMessage = this.isRegister ? 'Account created. Opening your dashboard.' : 'Signed in successfully. Opening your dashboard.';
        void this.router.navigateByUrl('/dashboard');
      },
      error: (error: HttpErrorResponse) => {
        this.submitting = false;
        this.errorMessage = this.getErrorMessage(error);
      },
    });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    const detail = error.error?.detail ?? error.error?.message;
    if (typeof detail === 'string' && detail.trim()) {
      return detail;
    }
    if (error.status === 0) {
      return 'We could not reach CyberShield DN. Check your connection and try again.';
    }
    if (error.status === 401) {
      return 'The email or password is incorrect. Please try again.';
    }
    return 'We could not complete your request. Please try again.';
  }
}
