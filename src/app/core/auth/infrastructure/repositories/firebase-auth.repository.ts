import { Injectable, inject } from '@angular/core';
import { Observable, catchError, defer, from, map, of, shareReplay, switchMap, throwError } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { AuthRepositoryPort } from '../../domain/ports/auth-repository.port';
import { LoginRequestModel } from '../../domain/models/login-request.model';
import { RegisterRequestModel } from '../../domain/models/register-request.model';
import { UserModel } from '../../domain/models/user.model';

/**
 * Repositorio de autenticación que utiliza Firebase
 * Implementa el puerto AuthRepositoryPort
 */
@Injectable({
    providedIn: 'root',
})
export class FirebaseAuthRepository implements AuthRepositoryPort {
    private auth = inject(Auth);
    private googleProvider = new GoogleAuthProvider();

    /**
     * Inicia sesión con credenciales (email/password)
     * Implementación mock para demo
     */
    login(credentials: LoginRequestModel): Observable<{ user: UserModel; token: string }> {
        // Mock implementation for demo
        return of({
            user: new UserModel(
                '1',
                credentials.email,
                'Demo User',
                'https://ui-avatars.com/api/?name=Demo+User&background=random',
                'email'
            ),
            token: 'mock-jwt-token',
        });
    }

    /**
     * Inicia sesión con Google usando Firebase Auth
     */
    loginWithGoogle(): Observable<{ user: UserModel; token: string }> {
        this.googleProvider.addScope('email');

        return defer(() => signInWithPopup(this.auth, this.googleProvider)).pipe(
            switchMap((auth) => Promise.all([auth.user.getIdToken(), auth.user.getIdTokenResult()])),
            map(([token, idTokenResult]) => {
                const claims = idTokenResult.claims as Record<string, any>;
                const user = new UserModel(
                    claims['user_id'] || claims['sub'] || '',
                    claims['email'] || '',
                    claims['name'] || (claims['email'] ? String(claims['email']).split('@')[0] : 'Usuario'),
                    claims['picture'],
                    'google'
                );

                return { user, token };
            }),
            shareReplay(1),
            catchError((error) => throwError(() => `Error al iniciar sesión con Google: ${error.message}`))
        );
    }

    /**
     * Inicia sesión con GitHub
     * Implementación mock para demo
     */
    loginWithGithub(): Observable<{ user: UserModel; token: string }> {
        // Mock implementation for demo
        return of({
            user: new UserModel(
                '3',
                'user@github.com',
                'Github User',
                'https://ui-avatars.com/api/?name=Github+User&background=24292e',
                'github'
            ),
            token: 'mock-github-jwt-token',
        });
    }

    /**
     * Registra un nuevo usuario
     * Implementación mock para demo
     */
    register(registerData: RegisterRequestModel): Observable<{ user: UserModel; token: string }> {
        // Mock implementation for demo
        return of({
            user: new UserModel(
                '4',
                registerData.email,
                registerData.name,
                `https://ui-avatars.com/api/?name=${registerData.name.replace(' ', '+')}&background=random`,
                'email'
            ),
            token: 'mock-register-jwt-token',
        });
    }

    /**
     * Verifica el estado de autenticación actual
     */
    checkAuthStatus(): Observable<{ user: UserModel; token: string } | null> {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            return of(null);
        }

        try {
            const user = JSON.parse(userData);
            return of({
                user: new UserModel(user.id, user.email, user.name, user.photoURL, user.provider),
                token,
            });
        } catch (error) {
            return of(null);
        }
    }

    /**
     * Cierra la sesión del usuario
     */
    logout(): void {
        // No es necesario hacer nada aquí, ya que el token se elimina en el caso de uso
        this.auth.signOut().catch((error) => console.error('Error al cerrar sesión:', error));
    }
}
