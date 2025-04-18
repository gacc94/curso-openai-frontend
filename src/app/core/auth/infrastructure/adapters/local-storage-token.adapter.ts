import { Injectable } from '@angular/core';
import { TokenStoragePort } from '../../domain/ports/token-storage.port';

/**
 * Adaptador para el almacenamiento de tokens en localStorage
 * Implementa el puerto TokenStoragePort
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageTokenAdapter implements TokenStoragePort {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  /**
   * Guarda un token en localStorage
   */
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Obtiene el token de localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Elimina el token de localStorage
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Guarda los datos del usuario en localStorage
   */
  saveUserData(userData: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }

  /**
   * Obtiene los datos del usuario de localStorage
   */
  getUserData(): any | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Elimina los datos del usuario de localStorage
   */
  removeUserData(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}
