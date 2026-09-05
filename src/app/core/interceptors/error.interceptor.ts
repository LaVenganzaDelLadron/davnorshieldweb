import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../api/auth.service';
export interface ApiError { 
    status:number; message:string; 
    detail?:unknown; 
}
export const errorInterceptor: HttpInterceptorFn = (request,next) => { 
    const auth=inject(AuthService); 
    const router=inject(Router); 
    return next(request).pipe(catchError((error:HttpErrorResponse)=>{
        let message='Something went wrong. Please try again.'; 
        if(error.status===401){auth.logout();
            void router.navigate(['/login']);
            message='Your session has expired. Please sign in again.';
        }
        else if(error.status===403) message='Access Denied.'; 
        else if(error.status===404) message='The requested resource was not found.'; 
        else if(error.status>=500) message='The server is temporarily unavailable.'; 
        return throwError(()=>({
            status:error.status,message,detail:error.error
        } as ApiError));
    }));
};
