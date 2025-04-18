import { Injectable, inject } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { AUTH_REPOSITORY, TOKEN_STORAGE } from '../../domain/ports/injection-tokens';
import { UserModel } from '../../domain/models/user.model';

/**
 * Caso de uso para verificar el estado de autenticación
 * Implementa la lógica de negocio para verificar si el usuario está autenticado
 */
@Injectable({
  providedIn: 'root'
})
export class CheckAuthStatusUseCase {
  private authRepository = inject(AUTH_REPOSITORY);
  private tokenStorage = inject(TOKEN_STORAGE);

  /**
   * Ejecuta el caso de uso de verificación de estado de autenticación
   * @returns Observable que emite true si el usuario está autenticado
   */
  execute(): Observable<boolean> {
    const token = this.tokenStorage.getToken();

    if (!token) {
      return of(false);
    }

    return this.authRepository.checkAuthStatus().pipe(
      tap(result => {
        if (result) {
          const { user, token } = result;
          this.tokenStorage.saveToken(token);
          this.tokenStorage.saveUserData(user);
        }
      }),
      map(result => !!result)
    );
  }
}
