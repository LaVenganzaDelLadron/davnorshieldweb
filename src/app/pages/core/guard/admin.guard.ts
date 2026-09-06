import { inject } from '@angular/core'; 
import { CanActivateFn, Router } from '@angular/router'; 
import { map } from 'rxjs'; 
import { AuthService } from '../api/auth.service';

export const adminGuard: CanActivateFn = () => {
    const auth=inject(AuthService);
    const router=inject(Router);
    return auth.me().pipe(map(user=>user.role==='admin'||router.createUrlTree(['/dashboard'])));
};
