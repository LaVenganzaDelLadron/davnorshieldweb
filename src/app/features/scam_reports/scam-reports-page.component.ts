import { Component } from '@angular/core';
import { PageHeaderComponent, ReportTableComponent } from '../../shared/components/cyber-ui/cyber-ui.component';

@Component({selector:'app-scam-reports-page',standalone:true,imports:[PageHeaderComponent,ReportTableComponent],template:`<section class="page-enter mx-auto max-w-7xl"><app-page-header title="Scam Reports" subtitle="Review and manage community-submitted incident intelligence."/><div class="cyber-card mb-5 p-4"><div class="flex flex-wrap gap-2"><input class="input min-w-50 flex-1" placeholder="⌕ Search reports"/><button class="btn btn-secondary">Municipality⌄</button><button class="btn btn-secondary">Threat type⌄</button><button class="btn btn-secondary">Status⌄</button></div></div><app-report-table/><button class="floating-action">＋ <span>Report scam</span></button></section>`})
export class ScamReportsPageComponent {}
