import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject the AuthService
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  // check if token is found, redirect to login page
  if (!authToken) {
    // Redirect to login page
    // We dont need to return false, because navigate() already does that
    inject(Router).navigate(['/login']);
  }
  // If token is found, allow access to the route
  return true;
};
