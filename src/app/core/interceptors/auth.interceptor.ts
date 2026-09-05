import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../api/auth.service';
export const authInterceptor: HttpInterceptorFn = (request,next) => { const token=inject(AuthService).getToken(); const isPublic=/\/auth\/(login|register)$/.test(request.url); return token && !isPublic ? next(request.clone({setHeaders:{Authorization:`Bearer ${token}`}})) : next(request); };
