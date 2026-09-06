import { Injectable, inject } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { AuthService } from '../api/auth.service';
import { ROLES } from '../constants/roles.constants';

@Injectable({ providedIn: 'root' })
export class AccessControlService {
  private readonly auth = inject(AuthService);

  canAccess(request: HttpRequest<unknown>): boolean {
    if (this.isPublic(request)) return true;
    if (!this.auth.isAuthenticated()) return false;
    if (this.auth.isSuperAdmin()) return true;

    const path = new URL(request.url, window.location.origin).pathname;
    const method = request.method.toUpperCase();

    // Citizens can use their own account, scanning, community reads, reports, and chat.
    if (this.auth.getRole() === ROLES.CITIZEN) {
      if (path.includes('/users') || path.includes('/documents/upload')) return false;
      if (path.includes('/dashboard/admin') || path.includes('/dashboard/lgu')) return false;
      if (path.includes('/reports') && ['POST', 'GET'].includes(method)) return true;
      if (path.includes('/chat/') && ['POST', 'GET'].includes(method)) return true;
      return ['GET'].includes(method) || path.includes('/auth/me') || path.includes('/auth/change-password') || path.includes('/auth/deactivate-account');
    }

    return true;
  }

  private isPublic(request: HttpRequest<unknown>): boolean {
    const path = new URL(request.url, window.location.origin).pathname;
    return request.method === 'GET' && (path.endsWith('/health') || path === '/')
      || /\/auth\/(login|register)$/.test(path)
      || path.includes('/scanner/');
  }
}
