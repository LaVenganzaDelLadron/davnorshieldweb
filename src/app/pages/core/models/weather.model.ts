import { ThreatLevel } from '../constants/threat.constants';
export interface ThreatForecast { 
    category: string; 
    probability: number; 
    expectedReports: number; 
}
export interface RiskForecast { 
    score: number; 
    level: ThreatLevel; 
    trend: 'rising'|'stable'|'falling'; 
    forecastAt: string; 
}
export interface CyberWeather { 
    areaId?: string; 
    areaName: string; 
    risk: RiskForecast; 
    threats: ThreatForecast[]; 
    summary: string; 
    updatedAt: string; 
}
