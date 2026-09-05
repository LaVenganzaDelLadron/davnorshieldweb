import { inject } from '@angular/core'; 
import { CanActivateFn, Router } from '@angular/router'; 
import { AuthService } from '../api/auth.service';
export const authGuard: CanActivateFn = () => inject(AuthService).isAuthenticated() || inject(Router).createUrlTree(['/login']);
