import { Provider } from '@angular/core';
import { AUTH_REPOSITORY, TOKEN_STORAGE } from './domain/ports/injection-tokens';
import { FirebaseAuthRepository } from './infrastructure/repositories/firebase-auth.repository';
import { LocalStorageTokenAdapter } from './infrastructure/adapters/local-storage-token.adapter';

/**
 * Proveedores para la arquitectura hexagonal del módulo de autenticación
 */
export const AUTH_PROVIDERS: Provider[] = [
  // Proveedores de puertos (interfaces)
  {
    provide: AUTH_REPOSITORY,
    useClass: FirebaseAuthRepository
  },
  {
    provide: TOKEN_STORAGE,
    useClass: LocalStorageTokenAdapter
  }
];
