import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, firstValueFrom, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = await firstValueFrom(
    auth.userSignal$.pipe(
      filter(user => user !== undefined), // Wait until Firebase finishes initializing
      take(1),
    ),
  );

  if (user) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { redirectTo: state.url } });
    return false;
  }
};
