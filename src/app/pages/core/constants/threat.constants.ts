export const THREAT_LEVELS = [
    'low', 
    'medium', 
    'high', 
    'critical'
] as const;
export type ThreatLevel = typeof THREAT_LEVELS[number];
