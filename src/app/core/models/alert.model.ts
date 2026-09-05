import { ThreatLevel } from '../constants/threat.constants';
export interface Alert { id: string; title: string; message: string; severity: ThreatLevel; barangayId?: string; municipalityId?: string; isActive: boolean; createdAt: string; expiresAt?: string; }
export interface BroadcastAlertRequest { title: string; message: string; severity: ThreatLevel; barangayIds?: string[]; municipalityIds?: string[]; expiresAt?: string; }
