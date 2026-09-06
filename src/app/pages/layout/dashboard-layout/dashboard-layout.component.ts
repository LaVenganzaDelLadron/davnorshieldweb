import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout', standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
  <div class="app-shell">
    <aside class="side-nav">
      <a routerLink="/dashboard" class="app-brand"><span class="brand-mark">✦</span><span>CyberShield <b>DN</b></span></a>
      <p class="nav-label">Monitoring</p>
      <nav>@for (item of mainNav; track item.path) {<a [routerLink]="item.path" routerLinkActive="active"><span>{{item.icon}}</span>{{item.label}}</a>}</nav>
      <p class="nav-label">Administration</p>
      <nav>@for (item of adminNav; track item.path) {<a [routerLink]="item.path" routerLinkActive="active"><span>{{item.icon}}</span>{{item.label}}</a>}</nav>
      <div class="account-box"><strong>Elton Dela Cruz</strong><small>Tagum City · Analyst</small><button class="btn btn-secondary">Sign out</button></div>
    </aside>
    <main class="main-content"><header class="top-nav"><button class="mobile-menu btn btn-secondary" (click)="drawer.set(!drawer())" aria-label="Toggle navigation">☰</button><div class="search-box"><label for="global-search">Search</label><input id="global-search" placeholder="Search reports, barangays, threats..." /></div><span class="system-status">● System operational</span><a routerLink="/alerts" aria-label="Alerts">Alerts <b>4</b></a><a routerLink="/profile" class="profile-link">E</a></header>
      <router-outlet />
    </main>
    <nav class="bottom-nav">@for (item of mobileNav; track item.path) {<a [routerLink]="item.path" routerLinkActive="active"><span>{{item.icon}}</span>{{item.label}}</a>}</nav>
    @if(drawer()) {<div class="mobile-drawer" (click)="drawer.set(false)"><div class="drawer-panel" (click)="$event.stopPropagation()"><a routerLink="/dashboard" class="app-brand">✦ CyberShield <b>DN</b></a>@for(item of mainNav;track item.path){<a [routerLink]="item.path" (click)="drawer.set(false)">{{item.icon}}&nbsp; {{item.label}}</a>}</div></div>}
  </div>`,
})
export class DashboardLayoutComponent {
  drawer = signal(false);
  mainNav = [{path:'/dashboard',icon:'◫',label:'Dashboard'},{path:'/cyber-weather',icon:'◌',label:'Cyber Weather'},{path:'/heatmap',icon:'⌖',label:'Scam Heatmap'},{path:'/scanner',icon:'◉',label:'AI Scanner'},{path:'/reports',icon:'▤',label:'Scam Reports'},{path:'/alerts',icon:'♧',label:'Alerts'},{path:'/analytics',icon:'↗',label:'Analytics'},{path:'/municipalities',icon:'⌂',label:'Municipalities'},{path:'/barangays',icon:'≡',label:'Barangays'},{path:'/chat',icon:'◌',label:'Community Chat'},{path:'/profile',icon:'◍',label:'Profile'},{path:'/settings',icon:'⚙',label:'Settings'}];
  adminNav = [{path:'/admin/users',icon:'♙',label:'Users'},{path:'/admin/patterns',icon:'⌁',label:'Threat Patterns'},{path:'/admin/lgu',icon:'▦',label:'LGU Dashboard'},{path:'/school-dashboard',icon:'▣',label:'School Dashboard'}];
  mobileNav = [{path:'/dashboard',icon:'⌂',label:'Home'},{path:'/scanner',icon:'⌕',label:'Scan'},{path:'/reports',icon:'＋',label:'Report'},{path:'/heatmap',icon:'⌖',label:'Map'},{path:'/alerts',icon:'!',label:'Alerts'},{path:'/profile',icon:'○',label:'Profile'}];
}
