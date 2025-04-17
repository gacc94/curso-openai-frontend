export interface User {
    id: string;
    email: string;
    name: string;
    photoURL?: string;
    provider?: 'google' | 'github' | 'email';
}

export interface AuthState {
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    errorMessage?: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    name: string;
}
