import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { LoginUseCase } from './use-cases/login.use-case';
import { LoginWithGoogleUseCase } from './use-cases/login-with-google.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';
import { CheckAuthStatusUseCase } from './use-cases/check-auth-status.use-case';
import { LogoutUseCase } from './use-cases/logout.use-case';

import { LoginRequestModel } from '../domain/models/login-request.model';
import { RegisterRequestModel } from '../domain/models/register-request.model';
import { AuthStateModel } from '../domain/models/auth-state.model';
import { UserModel } from '../domain/models/user.model';

/**
 * Fachada para la autenticación
 * Proporciona una interfaz unificada para todas las operaciones de autenticación
 */
@Injectable({
    providedIn: 'root',
})
export class AuthFacade {
    private router = inject(Router);
    private loginUseCase = inject(LoginUseCase);
    private loginWithGoogleUseCase = inject(LoginWithGoogleUseCase);
    private registerUseCase = inject(RegisterUseCase);
    private checkAuthStatusUseCase = inject(CheckAuthStatusUseCase);
    private logoutUseCase = inject(LogoutUseCase);

    // Estado de autenticación usando signals
    private _authState = signal<AuthStateModel>(AuthStateModel.checking());

    // Signals públicas computadas
    public currentUser = computed(() => this._authState().user);
    public authStatus = computed(() => this._authState().status);
    public errorMessage = computed(() => this._authState().errorMessage);
    public isAuthenticated = computed(() => this._authState().isAuthenticated());

    constructor() {
        this.checkAuthStatus().subscribe();
    }

    /**
     * Inicia sesión con credenciales (email/password)
     */
    login(email: string, password: string): Observable<boolean> {
        this._authState.set(AuthStateModel.checking());

        const loginRequest = new LoginRequestModel(email, password);

        return this.loginUseCase.execute(loginRequest).pipe(
            tap(() => {
                this._authState.set(AuthStateModel.authenticated(this.currentUser() as UserModel));
            }),
            catchError((error) => {
                this._authState.set(AuthStateModel.notAuthenticated(error.message));
                return throwError(() => error.message);
            })
        );
    }

    /**
     * Inicia sesión con Google
     */
    loginWithGoogle(): Observable<boolean> {
        this._authState.set(AuthStateModel.checking());

        return this.loginWithGoogleUseCase.execute().pipe(
            tap(() => {
                this._authState.set(AuthStateModel.authenticated(this.currentUser() as UserModel));
            }),
            map(() => true),
            catchError((error) => {
                this._authState.set(AuthStateModel.notAuthenticated(error.message));
                return throwError(() => error.message);
            })
        );
    }

    /**
     * Registra un nuevo usuario
     */
    register(name: string, email: string, password: string): Observable<boolean> {
        this._authState.set(AuthStateModel.checking());

        const registerRequest = new RegisterRequestModel(name, email, password);

        return this.registerUseCase.execute(registerRequest).pipe(
            tap(() => {
                this._authState.set(AuthStateModel.authenticated(this.currentUser() as UserModel));
            }),
            catchError((error) => {
                this._authState.set(AuthStateModel.notAuthenticated(error.message));
                return throwError(() => error.message);
            })
        );
    }

    /**
     * Verifica el estado de autenticación actual
     */
    checkAuthStatus(): Observable<boolean> {
        this._authState.set(AuthStateModel.checking());

        return this.checkAuthStatusUseCase.execute().pipe(
            tap((isAuthenticated) => {
                if (isAuthenticated) {
                    this._authState.set(AuthStateModel.authenticated(this.currentUser() as UserModel));
                } else {
                    this._authState.set(AuthStateModel.notAuthenticated());
                }
            }),
            catchError(() => {
                this._authState.set(AuthStateModel.notAuthenticated());
                return of(false);
            })
        );
    }

    /**
     * Cierra la sesión del usuario
     */
    logout(): void {
        this.logoutUseCase.execute();
        this._authState.set(AuthStateModel.notAuthenticated());
        this.router.navigateByUrl('/auth/sign-in');
    }
}
