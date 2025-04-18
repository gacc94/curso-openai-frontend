/**
 * Modelo de dominio para la solicitud de inicio de sesión
 * Representa los datos necesarios para iniciar sesión
 */
export class LoginRequestModel {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  /**
   * Valida que los datos de inicio de sesión sean correctos
   */
  public isValid(): boolean {
    return (
      !!this.email &&
      !!this.password &&
      this.email.includes('@') &&
      this.password.length >= 6
    );
  }
}
