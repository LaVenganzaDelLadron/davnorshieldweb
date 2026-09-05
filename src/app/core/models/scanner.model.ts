import { ThreatLevel } from '../constants/threat.constants';

export interface URLScanRequest { 
    url: string; 
}
export interface SMSScanRequest { 
    message: string; 
    sender?: string; 
}
export interface QRScanRequest { 
    image: File; 
}
export interface TextScanRequest { 
    text: string; 
}
export interface ScanIndicator { 
    type: string; 
    label: string; 
    description: string; 
    severity: ThreatLevel; 
}
export interface ScanResponse { 
    id: string; 
    score: number; 
    risk: ThreatLevel; 
    category?: string; 
    verdict: 'safe'|'suspicious'|'malicious'; 
    indicators: ScanIndicator[]; 
    recommendation?: string; 
    scannedAt: string; 
}
