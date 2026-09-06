import { inject } from '@angular/core'; 
import { CanActivateFn, Router } from '@angular/router'; 
import { map } from 'rxjs'; 
import { AuthService } from '../api/auth.service';
import { ROLES } from '../constants/roles.constants';

export const adminGuard: CanActivateFn = () => {
    const auth=inject(AuthService);
    const router=inject(Router);
    return auth.me().pipe(map(user =>
      user.role !== ROLES.CITIZEN
        ? true
        : router.createUrlTree(['/dashboard'])
    ));
};
