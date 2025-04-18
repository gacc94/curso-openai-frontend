import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { AUTH_REPOSITORY, TOKEN_STORAGE } from '../../domain/ports/injection-tokens';

/**
 * Caso de uso para el inicio de sesión con Google
 * Implementa la lógica de negocio para el inicio de sesión con Google
 */
@Injectable({
    providedIn: 'root',
})
export class LoginWithGoogleUseCase {
    private authRepository = inject(AUTH_REPOSITORY);
    private tokenStorage = inject(TOKEN_STORAGE);

    /**
     * Ejecuta el caso de uso de inicio de sesión con Google
     * @returns Observable que emite true si el inicio de sesión fue exitoso
     */
    execute(): Observable<boolean> {
        return this.authRepository.loginWithGoogle().pipe(
            tap(({ user, token }) => {
                this.tokenStorage.saveToken(token);
                this.tokenStorage.saveUserData(user);
            }),
            map(() => true)
        );
    }
}
