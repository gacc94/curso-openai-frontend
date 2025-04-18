import { Injectable, inject } from '@angular/core';
import { CanActivate, CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthFacade } from '../../application/auth.facade';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanMatch {
    private authFacade = inject(AuthFacade);
    private router = inject(Router);

    /**
     * Determina si una ruta puede ser activada
     */
    canActivate(): Observable<boolean | UrlTree> {
        return this.checkAuthStatus();
    }

    /**
     * Determina si una ruta puede ser emparejada
     */
    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
        return this.checkAuthStatus();
    }

    /**
     * Verifica el estado de autenticación del usuario
     */
    private checkAuthStatus(): Observable<boolean | UrlTree> {
        // Usamos el método checkAuthStatus de la fachada para verificar si el usuario está autenticado
        return this.authFacade.checkAuthStatus().pipe(
            tap((isAuthenticated) => {
                if (!isAuthenticated) {
                    this.router.navigateByUrl('/auth/sign-in');
                }
            })
        );
    }
}
