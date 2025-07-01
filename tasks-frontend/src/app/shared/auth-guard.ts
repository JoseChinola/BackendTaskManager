import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './services/auth';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth)
  const router = inject(Router)

  return auth.getPerfil().pipe(
    map(() => true),
    catchError(() => {

      return of(router.createUrlTree(['/auth/login']));
    })
  )
};
