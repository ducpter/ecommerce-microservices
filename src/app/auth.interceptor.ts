import { inject, Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { catchError, from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(KeycloakService);

  // Optional: skip token for assets or public APIs
  if (req.url.includes('/assets')) {
    return next(req);
  }

  return from(keycloak.getToken()).pipe(
    switchMap(token => {
      console.log('🔑 Keycloak Token:', token); // Log token
      console.log('📤 Request URL:', req.url); // Log URL yêu cầu
      if (!token) {
        console.warn('⚠️ No token available');
      }
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    }),
    catchError(error => {
      console.error('🔴 Interceptor error:', error);
      throw error;
    })
  );
};
