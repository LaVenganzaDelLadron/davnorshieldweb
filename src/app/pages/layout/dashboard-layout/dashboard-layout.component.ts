import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/api/auth.service';
import { User } from '../../../core/models/user.model';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-dashboard-layout', standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
  <div class="app-shell">
    <aside class="side-nav">
      <a routerLink="/dashboard" class="app-brand"><span class="brand-mark">✦</span><span>CyberShield <b>DN</b></span></a>
      <p class="nav-label">Main menu</p>
      <nav>@for (item of mobileNav; track item.path) {<a [routerLink]="item.path" routerLinkActive="active"><span>{{item.icon}}</span>{{lang.t(item.key)}}</a>}</nav>
      <p class="nav-label">More tools</p>
      <nav>@for (item of visibleSecondaryNav; track item.path) {<a [routerLink]="item.path" routerLinkActive="active"><span>{{item.icon}}</span>{{lang.t(item.key)}}</a>}</nav>
      <div class="account-box">@if (user) {<strong>{{ user.name }}</strong><small>{{ user.municipalityId || 'Municipality unavailable' }} · {{ user.role }}</small>} @else {<small>Account unavailable</small>}<button class="btn btn-secondary" type="button" (click)="logout()">Sign out</button></div>
    </aside>
    <header class="simple-header">
      <div class="simple-brand"><a routerLink="/dashboard"><span class="brand-mark">✦</span>CyberShield <b>DN</b></a></div>
      <nav class="utility-nav"><a routerLink="/dashboard">Home</a><a routerLink="/scanner">Scan</a><a routerLink="/reports">Report</a><a routerLink="/heatmap">Map</a><a routerLink="/profile">Profile</a></nav>
      <nav class="account-nav"><a routerLink="/alerts">{{lang.t('alerts')}}</a><a routerLink="/settings">{{lang.t('settings')}}</a><button class="language-toggle" type="button" (click)="lang.toggle()" [attr.aria-label]="lang.language() === 'en' ? 'Switch to Filipino' : 'Switch to English'">{{lang.language() === 'en' ? 'Filipino' : 'English'}}</button></nav>
    </header>
    <main class="main-content"><header class="simple-toolbar"><button class="mobile-menu btn btn-secondary" (click)="drawer.set(!drawer())" aria-label="Toggle navigation">Menu</button><div class="search-box"><label for="global-search">Search</label><input id="global-search" placeholder="Search reports or places" /></div></header>
      <router-outlet />
    </main>
    <nav class="bottom-nav">@for (item of mobileNav; track item.path) {<a [routerLink]="item.path" routerLinkActive="active"><span>{{item.icon}}</span>{{lang.t(item.key)}}</a>}</nav>
    @if(drawer()) {<div class="mobile-drawer" (click)="drawer.set(false)"><div class="drawer-panel" (click)="$event.stopPropagation()"><a routerLink="/dashboard" class="app-brand">✦ CyberShield <b>DN</b></a>@for(item of mobileNav;track item.path){<a [routerLink]="item.path" (click)="drawer.set(false)">{{item.icon}}&nbsp; {{lang.t(item.key)}}</a>}</div></div>}
  </div>`,
})
export class DashboardLayoutComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly lang = inject(LanguageService);
  user: User | null = null;
  drawer = signal(false);
  mainNav = [{path:'/dashboard',icon:'◫',label:'Dashboard'},{path:'/cyber-weather',icon:'◌',label:'Cyber Weather'},{path:'/heatmap',icon:'⌖',label:'Scam Heatmap'},{path:'/scanner',icon:'◉',label:'AI Scanner'},{path:'/reports',icon:'▤',label:'Scam Reports'},{path:'/alerts',icon:'♧',label:'Alerts'},{path:'/analytics',icon:'↗',label:'Analytics'},{path:'/municipalities',icon:'⌂',label:'Municipalities'},{path:'/barangays',icon:'≡',label:'Barangays'},{path:'/chat',icon:'◌',label:'Community Chat'},{path:'/profile',icon:'◍',label:'Profile'},{path:'/settings',icon:'⚙',label:'Settings'}];
  adminNav = [{path:'/admin/users',icon:'♙',label:'Users'},{path:'/admin/patterns',icon:'⌁',label:'Threat Patterns'},{path:'/admin/lgu',icon:'▦',label:'LGU Dashboard'},{path:'/school-dashboard',icon:'▣',label:'School Dashboard'}];
  mobileNav = [{path:'/dashboard',icon:'⌂',key:'home'},{path:'/scanner',icon:'⌕',key:'check'},{path:'/reports',icon:'＋',key:'report'},{path:'/heatmap',icon:'⌖',key:'map'},{path:'/profile',icon:'○',key:'profile'}];
  secondaryNav = [{path:'/cyber-weather',icon:'◌',key:'weather'},{path:'/alerts',icon:'!',key:'alerts'},{path:'/analytics',icon:'↗',key:'analytics'},{path:'/municipalities',icon:'⌂',key:'municipalities'},{path:'/barangays',icon:'≡',key:'barangays'},{path:'/chat',icon:'◌',key:'chat'},{path:'/settings',icon:'⚙',key:'settings'}];
  private readonly adminOnlyPaths = new Set(['/analytics', '/municipalities', '/barangays']);

  get visibleSecondaryNav() {
    const role = this.user?.role;
    const isAdmin = role && role !== 'citizen';
    return this.secondaryNav.filter(item => !this.adminOnlyPaths.has(item.path) || isAdmin);
  }

  constructor() {
    afterNextRender(() => {
      this.auth.me().subscribe({
        next: user => this.user = user,
      });
    });
  }

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
