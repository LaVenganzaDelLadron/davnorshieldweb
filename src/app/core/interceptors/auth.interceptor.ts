import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthService } from '../api/auth.service';
import { AccessControlService } from '../services/access-control.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const access = inject(AccessControlService);
  const token = auth.getToken();
  const isPublic = /\/auth\/(login|register)$/.test(request.url);

  if (!access.canAccess(request)) {
    return throwError(() => new HttpErrorResponse({
      status: 403,
      statusText: 'Forbidden',
      url: request.url,
      error: { message: 'Your account does not have access to this resource.' },
    }));
  }

  return token && !isPublic
    ? next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
    : next(request);
};
