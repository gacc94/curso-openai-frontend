import { UserModel } from './user.model';

/**
 * Modelo de dominio para el estado de autenticación
 * Representa el estado actual de autenticación del usuario
 */
export class AuthStateModel {
  constructor(
    public readonly user: UserModel | null,
    public readonly status: 'checking' | 'authenticated' | 'not-authenticated',
    public readonly errorMessage?: string
  ) {}

  /**
   * Verifica si el usuario está autenticado
   */
  public isAuthenticated(): boolean {
    return this.status === 'authenticated' && !!this.user;
  }

  /**
   * Verifica si el sistema está verificando la autenticación
   */
  public isChecking(): boolean {
    return this.status === 'checking';
  }

  /**
   * Crea un estado de autenticación para un usuario autenticado
   */
  public static authenticated(user: UserModel): AuthStateModel {
    return new AuthStateModel(user, 'authenticated');
  }

  /**
   * Crea un estado de autenticación para un usuario no autenticado
   */
  public static notAuthenticated(errorMessage?: string): AuthStateModel {
    return new AuthStateModel(null, 'not-authenticated', errorMessage);
  }

  /**
   * Crea un estado de autenticación para cuando se está verificando
   */
  public static checking(): AuthStateModel {
    return new AuthStateModel(null, 'checking');
  }
}
