/**
 * Puerto para el almacenamiento de tokens
 * Define las operaciones que debe implementar cualquier almacenamiento de tokens
 */
export interface TokenStoragePort {
  /**
   * Guarda un token en el almacenamiento
   */
  saveToken(token: string): void;

  /**
   * Obtiene el token del almacenamiento
   */
  getToken(): string | null;

  /**
   * Elimina el token del almacenamiento
   */
  removeToken(): void;

  /**
   * Guarda los datos del usuario en el almacenamiento
   */
  saveUserData(userData: any): void;

  /**
   * Obtiene los datos del usuario del almacenamiento
   */
  getUserData(): any | null;

  /**
   * Elimina los datos del usuario del almacenamiento
   */
  removeUserData(): void;
}
