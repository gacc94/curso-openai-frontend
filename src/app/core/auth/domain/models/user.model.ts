/**
 * Modelo de dominio para el usuario
 * Representa la entidad principal del dominio de autenticación
 */
export class UserModel {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly photoURL?: string,
    public readonly provider?: 'google' | 'github' | 'email'
  ) {}

  /**
   * Verifica si el usuario tiene un proveedor social
   */
  public hasSocialProvider(): boolean {
    return this.provider === 'google' || this.provider === 'github';
  }

  /**
   * Obtiene las iniciales del nombre del usuario
   */
  public getInitials(): string {
    return this.name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase();
  }
}
