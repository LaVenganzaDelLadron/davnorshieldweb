import { ThreatLevel } from '../constants/threat.constants';
export interface DashboardMetric { 
    label: string; 
    value: number; 
    change?: number; 
}
export interface DashboardData { 
    metrics: DashboardMetric[]; 
    generatedAt: string; 
}
export interface ThreatSummary { 
    category: string; 
    count: number; 
    severity: ThreatLevel; 
}
export interface Outbreak { 
    id: string; 
    title: string; 
    municipalityId?: string; 
    severity: ThreatLevel; 
    reportCount: number; 
    detectedAt: string; 
}
