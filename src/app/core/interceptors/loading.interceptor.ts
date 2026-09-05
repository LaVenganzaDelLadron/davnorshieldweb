import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../api/loading.service';
export const loadingInterceptor: HttpInterceptorFn = (request,next) => { const loading=inject(LoadingService); loading.start(); return next(request).pipe(finalize(()=>loading.stop())); };
