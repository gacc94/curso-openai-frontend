import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { RegisterRequestModel } from '../../domain/models/register-request.model';
import { AUTH_REPOSITORY, TOKEN_STORAGE } from '../../domain/ports/injection-tokens';

/**
 * Caso de uso para el registro de usuarios
 * Implementa la lógica de negocio para el registro de usuarios
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterUseCase {
  private authRepository = inject(AUTH_REPOSITORY);
  private tokenStorage = inject(TOKEN_STORAGE);

  /**
   * Ejecuta el caso de uso de registro
   * @param registerData Datos de registro
   * @returns Observable que emite true si el registro fue exitoso
   */
  execute(registerData: RegisterRequestModel): Observable<boolean> {
    if (!registerData.isValid()) {
      throw new Error('Datos de registro inválidos');
    }

    return this.authRepository.register(registerData).pipe(
      tap(({ user, token }) => {
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveUserData(user);
      }),
      map(() => true)
    );
  }
}
