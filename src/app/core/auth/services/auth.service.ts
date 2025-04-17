import { Injectable, computed, inject, linkedSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthState, LoginRequest, LoginResponse, RegisterRequest, User } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class AuthService{
    private readonly http = inject(HttpClient);

    // For demo purposes - in a real app, this would come from environment variables
    private readonly baseUrl = 'https://api.example.com/auth';

    // Auth state using signals
    private _authState = signal<AuthState>({
        status: 'checking',
        user: null,
    });

    // Public computed signals
    public currentUser = linkedSignal(() => this._authState().user);
    public authStatus = linkedSignal(() => this._authState().status);
    public errorMessage = linkedSignal(() => this._authState().errorMessage);

    constructor() {
        this.checkAuthStatus().subscribe();
    }

    private setAuthentication(user: User | any, token: string): boolean {
        this._authState.set({
            status: 'authenticated',
            user,
            errorMessage: undefined,
        });

        localStorage.setItem('token', token);
        return true;
    }

    login(credentials: LoginRequest): Observable<boolean> {
        // For demo purposes - in a real app, this would call a real API
        // return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials)
        //   .pipe(
        //     tap(({ token, user }) => this.setAuthentication(user, token)),
        //     map(() => true),
        //     catchError(err => throwError(() => err.error.message))
        //   );

        // Mock implementation for demo
        return of({
            user: {
                id: '1',
                email: credentials.email,
                name: 'Demo User',
                photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
                provider: 'email',
            },
            token: 'mock-jwt-token',
        }).pipe(
            tap(({ token, user }) => this.setAuthentication(user, token)),
            map(() => true)
        );
    }

    loginWithGoogle(): Observable<boolean> {
        // Mock implementation for demo
        return of({
            user: {
                id: '2',
                email: 'user@gmail.com',
                name: 'Google User',
                photoURL: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4',
                provider: 'google',
            },
            token: 'mock-google-jwt-token',
        }).pipe(
            tap(({ token, user }) => this.setAuthentication(user, token)),
            map(() => true)
        );
    }

    loginWithGithub(): Observable<boolean> {
        // Mock implementation for demo
        return of({
            user: {
                id: '3',
                email: 'user@github.com',
                name: 'Github User',
                photoURL: 'https://ui-avatars.com/api/?name=Github+User&background=24292e',
                provider: 'github',
            },
            token: 'mock-github-jwt-token',
        }).pipe(
            tap(({ token, user }) => this.setAuthentication(user, token)),
            map(() => true)
        );
    }

    register(registerData: RegisterRequest): Observable<boolean> {
        // Mock implementation for demo
        return of({
            user: {
                id: '4',
                email: registerData.email,
                name: registerData.name,
                photoURL: `https://ui-avatars.com/api/?name=${registerData.name.replace(' ', '+')}&background=random`,
                provider: 'email',
            },
            token: 'mock-register-jwt-token',
        }).pipe(
            tap(({ token, user }) => this.setAuthentication(user, token)),
            map(() => true)
        );
    }

    checkAuthStatus(): Observable<boolean> {
        const token = localStorage.getItem('token');

        if (!token) {
            this._authState.set({
                status: 'not-authenticated',
                user: null,
            });
            return of(false);
        }

        // Mock implementation for demo
        return of({
            user: {
                id: '1',
                email: 'user@example.com',
                name: 'Authenticated User',
                photoURL: 'https://ui-avatars.com/api/?name=Authenticated+User&background=random',
            },
            token: token,
        }).pipe(
            tap(({ token, user }) => this.setAuthentication(user, token)),
            map(() => true)
        );
    }

    logout() {
        localStorage.removeItem('token');
        this._authState.set({
            status: 'not-authenticated',
            user: null,
        });
    }
}
