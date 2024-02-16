import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    tap((isAuthenticated: any) => {
      if (!isAuthenticated) {
        alert("Bitte logge dich vorher ein.");
        router.navigate(['/auth']);
      }
    }),
    map(isAuthenticated => isAuthenticated)
  );
};