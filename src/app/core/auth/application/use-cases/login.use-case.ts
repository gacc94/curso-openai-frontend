import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { LoginRequestModel } from '../../domain/models/login-request.model';
import { AUTH_REPOSITORY, TOKEN_STORAGE } from '../../domain/ports/injection-tokens';
import { UserModel } from '../../domain/models/user.model';

/**
 * Caso de uso para el inicio de sesión
 * Implementa la lógica de negocio para el inicio de sesión
 */
@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {
  private authRepository = inject(AUTH_REPOSITORY);
  private tokenStorage = inject(TOKEN_STORAGE);

  /**
   * Ejecuta el caso de uso de inicio de sesión
   * @param credentials Credenciales de inicio de sesión
   * @returns Observable que emite true si el inicio de sesión fue exitoso
   */
  execute(credentials: LoginRequestModel): Observable<boolean> {
    if (!credentials.isValid()) {
      throw new Error('Credenciales inválidas');
    }

    return this.authRepository.login(credentials).pipe(
      tap(({ user, token }) => {
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveUserData(user);
      }),
      map(() => true)
    );
  }
}
