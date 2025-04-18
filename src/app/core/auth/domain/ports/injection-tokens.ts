import { InjectionToken } from '@angular/core';
import { AuthRepositoryPort } from './auth-repository.port';
import { TokenStoragePort } from './token-storage.port';

/**
 * Token de inyección para el repositorio de autenticación
 */
export const AUTH_REPOSITORY = new InjectionToken<AuthRepositoryPort>('AuthRepository');

/**
 * Token de inyección para el almacenamiento de tokens
 */
export const TOKEN_STORAGE = new InjectionToken<TokenStoragePort>('TokenStorage');
