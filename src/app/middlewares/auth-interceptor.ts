import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject AuthService to use auth token
  const authService = inject(AuthService);
  const authToken = authService.getToken(); // Get token from local storage

  // Clone the request and set the new header in one step.
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return next(authReq);
};
