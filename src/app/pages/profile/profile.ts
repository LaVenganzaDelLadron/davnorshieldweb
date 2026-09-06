import { CommonModule, DatePipe } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../core/api/auth.service';
import { MunicipalityService } from '../../core/api/municipality.service';
import { UserService } from '../../core/api/user.service';
import { Municipality } from '../../core/models/municipality.model';
import { User } from '../../core/models/user.model';

@Component({
  imports: [CommonModule, DatePipe, FormsModule],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  private readonly auth = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly municipalityService = inject(MunicipalityService);
  user: User | null = null;
  municipalities: Municipality[] = [];
  name = '';
  municipalityId = '';
  loading = true;
  saving = false;
  error = '';
  success = '';

  constructor() {
    afterNextRender(() => this.loadData());
  }

  private loadData(): void {
    forkJoin({
      user: this.auth.me(),
      municipalities: this.municipalityService.getMunicipalities(),
    }).subscribe({
      next: result => {
        this.user = result.user;
        this.name = result.user.name;
        this.municipalityId = result.user.municipalityId ?? '';
        this.municipalities = result.municipalities;
        this.loading = false;
      },
      error: () => {
        this.error = 'Profile data could not be loaded.';
        this.loading = false;
      },
    });
  }

  save(): void {
    if (!this.user || !this.name.trim() || this.saving) return;
    this.saving = true;
    this.error = '';
    this.success = '';
    this.userService.updateUser(this.user.id, { name: this.name.trim(), municipalityId: this.municipalityId || undefined }).subscribe({
      next: user => {
        this.user = user;
        this.success = 'Profile updated.';
        this.saving = false;
      },
      error: () => {
        this.error = 'Profile could not be updated.';
        this.saving = false;
      },
    });
  }
}
