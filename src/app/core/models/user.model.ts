import { UserRole } from '../constants/roles.constants';
export interface User { 
    id: string; 
    name: string; 
    email: string; 
    role: UserRole; 
    barangayId?: string; 
    municipalityId?: string; 
    avatarUrl?: string; 
    isActive: boolean; 
    createdAt: string; 
    updatedAt?: string; 
}
export interface UserFilters { 
    page?: number; 
    pageSize?: number; 
    search?: string; 
    role?: UserRole; 
    barangayId?: string; 
    municipalityId?: string; 
    isActive?: boolean; 
}
export interface PaginatedResponse<T> { 
    items: T[]; 
    total: number;
    page: number; 
    pageSize: number; 
}
