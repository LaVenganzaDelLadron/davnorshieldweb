import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/api/auth.service';

@Component({
  selector: 'app-dashboard-layout', standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
  <div class="app-shell">
    <aside class="side-nav">
      <a routerLink="/dashboard" class="app-brand"><span class="brand-mark">✦</span><span>CyberShield <b>DN</b></span></a>
      <p class="nav-label">Main menu</p>
      <nav>@for (item of mobileNav; track item.path) {<a [routerLink]="item.path" routerLinkActive="active"><span>{{item.icon}}</span>{{item.label}}</a>}</nav>
      <p class="nav-label">More tools</p>
      <nav>@for (item of secondaryNav; track item.path) {<a [routerLink]="item.path" routerLinkActive="active"><span>{{item.icon}}</span>{{item.label}}</a>}</nav>
      <div class="account-box"><strong>Elton Dela Cruz</strong><small>Tagum City · Analyst</small><button class="btn btn-secondary" type="button" (click)="logout()">Sign out</button></div>
    </aside>
    <header class="simple-header">
      <div class="simple-brand"><a routerLink="/dashboard"><span class="brand-mark">✦</span>CyberShield <b>DN</b></a></div>
      <nav class="utility-nav"><a routerLink="/dashboard">Home</a><a routerLink="/scanner">Scan</a><a routerLink="/reports">Report</a><a routerLink="/heatmap">Map</a><a routerLink="/profile">Profile</a></nav>
      <nav class="account-nav"><a routerLink="/alerts">Alerts</a><a routerLink="/settings">Settings</a></nav>
    </header>
    <main class="main-content"><header class="simple-toolbar"><button class="mobile-menu btn btn-secondary" (click)="drawer.set(!drawer())" aria-label="Toggle navigation">Menu</button><div class="search-box"><label for="global-search">Search</label><input id="global-search" placeholder="Search reports or places" /></div><span class="system-status">System operational</span></header>
      <router-outlet />
    </main>
    <nav class="bottom-nav">@for (item of mobileNav; track item.path) {<a [routerLink]="item.path" routerLinkActive="active"><span>{{item.icon}}</span>{{item.label}}</a>}</nav>
    @if(drawer()) {<div class="mobile-drawer" (click)="drawer.set(false)"><div class="drawer-panel" (click)="$event.stopPropagation()"><a routerLink="/dashboard" class="app-brand">✦ CyberShield <b>DN</b></a>@for(item of mobileNav;track item.path){<a [routerLink]="item.path" (click)="drawer.set(false)">{{item.icon}}&nbsp; {{item.label}}</a>}</div></div>}
  </div>`,
})
export class DashboardLayoutComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  drawer = signal(false);
  mainNav = [{path:'/dashboard',icon:'◫',label:'Dashboard'},{path:'/cyber-weather',icon:'◌',label:'Cyber Weather'},{path:'/heatmap',icon:'⌖',label:'Scam Heatmap'},{path:'/scanner',icon:'◉',label:'AI Scanner'},{path:'/reports',icon:'▤',label:'Scam Reports'},{path:'/alerts',icon:'♧',label:'Alerts'},{path:'/analytics',icon:'↗',label:'Analytics'},{path:'/municipalities',icon:'⌂',label:'Municipalities'},{path:'/barangays',icon:'≡',label:'Barangays'},{path:'/chat',icon:'◌',label:'Community Chat'},{path:'/profile',icon:'◍',label:'Profile'},{path:'/settings',icon:'⚙',label:'Settings'}];
  adminNav = [{path:'/admin/users',icon:'♙',label:'Users'},{path:'/admin/patterns',icon:'⌁',label:'Threat Patterns'},{path:'/admin/lgu',icon:'▦',label:'LGU Dashboard'},{path:'/school-dashboard',icon:'▣',label:'School Dashboard'}];
  mobileNav = [{path:'/dashboard',icon:'⌂',label:'Home'},{path:'/scanner',icon:'⌕',label:'Scan'},{path:'/reports',icon:'＋',label:'Report'},{path:'/heatmap',icon:'⌖',label:'Map'},{path:'/profile',icon:'○',label:'Profile'}];
  secondaryNav = [{path:'/cyber-weather',icon:'◌',label:'Cyber Weather'},{path:'/alerts',icon:'!',label:'Alerts'},{path:'/analytics',icon:'↗',label:'Analytics'},{path:'/municipalities',icon:'⌂',label:'Municipalities'},{path:'/barangays',icon:'≡',label:'Barangays'},{path:'/chat',icon:'◌',label:'Community Chat'},{path:'/settings',icon:'⚙',label:'Settings'}];

  logout(): void {
    if (!this.auth.isAuthenticated()) {
      void this.router.navigate(['/login']);
      return;
    }

    this.auth.logout().subscribe({
      next: () => void this.router.navigate(['/login']),
      error: () => {
        this.auth.clearSession();
        void this.router.navigate(['/login']);
      },
    });
  }
}
