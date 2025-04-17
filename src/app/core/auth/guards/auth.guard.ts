import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.authStatus() === 'authenticated') {
        return true;
    }

    router.navigateByUrl('/auth/sign-in');
    return false;
};

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.authStatus() === 'authenticated') {
        router.navigateByUrl('/');
        return false;
    }

    return true;
};
