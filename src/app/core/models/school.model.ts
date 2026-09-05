export interface School { 
    id: string; 
    name: string; 
    municipalityId: string; 
    barangayId?: string; 
    awarenessScore: number; 
    studentCount?: number; 
}
export interface SchoolStats { 
    totalSchools: number; 
    averageAwarenessScore: number; 
    schoolsAtRisk: number; 
}
