import { User } from './user.model';

export interface LoginRequest { 
    email: string; 
    password: string;
}
export interface RegisterRequest { 
    full_name: string;
    email: string; 
    password: string; 
    phone?: string;
    role: 'citizen' | 'admin' | 'lgu' | 'school';
    barangay_id?: string;
    municipality_id?: string;
    is_active?: boolean;
}
export interface TokenResponse { 
    access_token: string;
    token_type: string;
    expires_in: number;
}
export interface AuthResponse {
    user: User; 
    token: TokenResponse;
}
export interface ChangePasswordRequest { 
    currentPassword: string; 
    newPassword: string; 
}
