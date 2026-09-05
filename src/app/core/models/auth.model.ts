import { User } from './user.model';

export interface LoginRequest { 
    email: string; 
    password: string;
}
export interface RegisterRequest { 
    name: string; 
    email: string; 
    password: string; 
    barangayId?: string; 
    municipalityId?: string; 
}
export interface TokenResponse { 
    accessToken: string; 
    tokenType: string; 
    expiresIn?: number; 
    refreshToken?: string; 
}
export interface AuthResponse extends TokenResponse { 
    user: User; 
}
export interface ChangePasswordRequest { 
    currentPassword: string; 
    newPassword: string; 
}
