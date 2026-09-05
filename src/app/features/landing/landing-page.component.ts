import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly activeScan = signal('URL');
  @HostListener('window:scroll') onScroll() { this.scrolled.set(window.scrollY > 22); }
}
