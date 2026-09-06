import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './pages/core/interceptors/auth.interceptor';
import { errorInterceptor } from './pages/core/interceptors/error.interceptor';
import { loadingInterceptor } from './pages/core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor]))
  ]
};
