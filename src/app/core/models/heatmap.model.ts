import { ThreatLevel } from '../constants/threat.constants';
export interface HeatmapPoint { 
    areaId: string; 
    areaName: string; 
    latitude: number; 
    longitude: number; 
    reportCount: number; 
    risk: ThreatLevel; 
    score: number; 
}
export interface HeatmapStatistics { 
    totalReports: number; 
    activeAreas: number; 
    highRiskAreas: number; 
    updatedAt: string; 
}
