import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { LoginRequestModel } from '../models/login-request.model';
import { RegisterRequestModel } from '../models/register-request.model';

/**
 * Puerto para el repositorio de autenticación
 * Define las operaciones que debe implementar cualquier repositorio de autenticación
 */
export interface AuthRepositoryPort {
  /**
   * Inicia sesión con credenciales (email/password)
   */
  login(credentials: LoginRequestModel): Observable<{ user: UserModel; token: string }>;

  /**
   * Inicia sesión con Google
   */
  loginWithGoogle(): Observable<{ user: UserModel; token: string }>;

  /**
   * Inicia sesión con GitHub
   */
  loginWithGithub(): Observable<{ user: UserModel; token: string }>;

  /**
   * Registra un nuevo usuario
   */
  register(registerData: RegisterRequestModel): Observable<{ user: UserModel; token: string }>;

  /**
   * Verifica el estado de autenticación actual
   */
  checkAuthStatus(): Observable<{ user: UserModel; token: string } | null>;

  /**
   * Cierra la sesión del usuario
   */
  logout(): void;
}
