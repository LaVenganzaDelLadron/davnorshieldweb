export interface Municipality { 
    id: string; 
    name: string; 
    province: string; 
    population?: number; 
    barangayCount?: number; 
    riskScore?: number; 
}
export interface MunicipalitySummary { 
    municipalityId: string; 
    reportsToday: number; 
    activeAlerts: number; 
    riskScore: number; 
}
