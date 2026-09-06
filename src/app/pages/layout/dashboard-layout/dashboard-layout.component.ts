import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout', standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
  <div class="min-h-screen grid-bg bg-[#020617] text-slate-200">
    <aside class="fixed inset-y-0 left-0 z-30 hidden w-70 border-r border-slate-800 bg-[#07101f]/95 px-4 py-5 lg:block">
      <a routerLink="/dashboard" class="mb-8 flex items-center gap-3 px-2 text-lg font-bold tracking-tight text-white"><span class="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400 text-lg text-slate-950">◈</span><span>Davnor<span class="text-cyan-300">Shield</span></span></a>
      <p class="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">Command Center</p>
      <nav class="space-y-1">@for (item of mainNav; track item.path) {<a [routerLink]="item.path" routerLinkActive="bg-cyan-400/10 text-cyan-300 border-cyan-400/30" class="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm text-slate-400 transition hover:bg-slate-800/70 hover:text-white"><span class="w-5 text-center text-base">{{item.icon}}</span>{{item.label}}</a>}</nav>
      <p class="mb-3 mt-7 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">Administration</p>
      <nav class="space-y-1">@for (item of adminNav; track item.path) {<a [routerLink]="item.path" routerLinkActive="bg-cyan-400/10 text-cyan-300" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800/70 hover:text-white"><span class="w-5 text-center">{{item.icon}}</span>{{item.label}}</a>}</nav>
      <div class="absolute inset-x-4 bottom-5 rounded-2xl border border-slate-800 bg-slate-900/75 p-3"><div class="flex items-center gap-3"><div class="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-600 font-bold text-slate-950">E</div><div><p class="text-sm font-semibold text-white">Elton Dela Cruz</p><p class="text-xs text-slate-500">Tagum City · Analyst</p></div></div><button class="mt-3 w-full rounded-lg bg-slate-800 px-3 py-2 text-left text-xs text-slate-400 hover:text-white">↪ Sign out</button></div>
    </aside>
    <main class="lg:pl-70"><header class="sticky top-0 z-20 flex h-18 items-center gap-3 border-b border-slate-800/80 bg-[#020617]/75 px-4 backdrop-blur-xl sm:px-7"><button class="btn btn-ghost lg:hidden" (click)="drawer.set(!drawer())" aria-label="Toggle navigation">☰</button><div class="relative max-w-md flex-1"><span class="absolute left-3 top-2.5 text-slate-500">⌕</span><input aria-label="Search" class="w-full rounded-xl border border-slate-800 bg-slate-900/70 py-2 pl-9 pr-4 text-sm text-slate-200 placeholder:text-slate-600" placeholder="Search reports, barangays, threats..." /></div><div class="hidden items-center gap-2 text-xs text-slate-500 sm:flex"><span class="h-2 w-2 rounded-full bg-emerald-400 pulse-soft"></span>System operational</div><button class="relative grid h-9 w-9 place-items-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300" aria-label="Notifications">♧<span class="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[9px] text-white">4</span></button><div class="grid h-9 w-9 place-items-center rounded-full bg-cyan-300 text-sm font-bold text-slate-950">E</div></header>
      <div class="p-4 sm:p-7"><router-outlet /></div>
    </main>
    @if(drawer()) {<div class="fixed inset-0 z-40 bg-slate-950/80 lg:hidden" (click)="drawer.set(false)"><div class="h-full w-72 border-r border-slate-800 bg-[#07101f] p-5" (click)="$event.stopPropagation()"><a routerLink="/dashboard" (click)="drawer.set(false)" class="mb-7 flex items-center gap-3 text-lg font-bold text-white"><span class="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400 text-slate-950">◈</span>DavnorShield</a>@for(item of mainNav;track item.path){<a [routerLink]="item.path" (click)="drawer.set(false)" class="mb-1 flex rounded-xl px-3 py-3 text-sm text-slate-300">{{item.icon}}&nbsp;&nbsp;{{item.label}}</a>}</div></div>}
  </div>`,
})
export class DashboardLayoutComponent {
  drawer = signal(false);
  mainNav = [{path:'/dashboard',icon:'◫',label:'Dashboard'},{path:'/cyber-weather',icon:'◌',label:'Cyber Weather'},{path:'/heatmap',icon:'⌖',label:'Scam Heatmap'},{path:'/scanner',icon:'◉',label:'AI Scanner'},{path:'/reports',icon:'▤',label:'Scam Reports'},{path:'/alerts',icon:'♧',label:'Alerts'},{path:'/analytics',icon:'↗',label:'Analytics'},{path:'/municipalities',icon:'⌂',label:'Municipalities'},{path:'/barangays',icon:'≡',label:'Barangays'},{path:'/chat',icon:'◌',label:'Community Chat'},{path:'/profile',icon:'◍',label:'Profile'},{path:'/settings',icon:'⚙',label:'Settings'}];
  adminNav = [{path:'/admin/users',icon:'♙',label:'Users'},{path:'/admin/patterns',icon:'⌁',label:'Threat Patterns'},{path:'/admin/lgu',icon:'▦',label:'LGU Dashboard'},{path:'/school-dashboard',icon:'▣',label:'School Dashboard'}];
}
