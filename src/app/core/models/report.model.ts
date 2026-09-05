import { ThreatLevel } from '../constants/threat.constants';
export type ReportStatus = 'open'|'investigating'|'verified'|'dismissed'|'escalated';
export interface Report { id: string; reporterId?: string; title: string; description: string; category: string; status: ReportStatus; risk: ThreatLevel; barangayId?: string; municipalityId?: string; screenshotUrl?: string; createdAt: string; updatedAt?: string; }
export interface CreateReportRequest { title: string; description: string; category: string; barangayId?: string; municipalityId?: string; screenshot?: File; }
export interface ReportFilters { page?: number; pageSize?: number; status?: ReportStatus; category?: string; municipalityId?: string; barangayId?: string; search?: string; }
