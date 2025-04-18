import { Injectable, inject } from '@angular/core';
import { AUTH_REPOSITORY, TOKEN_STORAGE } from '../../domain/ports/injection-tokens';

/**
 * Caso de uso para cerrar sesión
 * Implementa la lógica de negocio para cerrar sesión
 */
@Injectable({
  providedIn: 'root'
})
export class LogoutUseCase {
  private authRepository = inject(AUTH_REPOSITORY);
  private tokenStorage = inject(TOKEN_STORAGE);

  /**
   * Ejecuta el caso de uso de cierre de sesión
   */
  execute(): void {
    this.tokenStorage.removeToken();
    this.tokenStorage.removeUserData();
    this.authRepository.logout();
  }
}
