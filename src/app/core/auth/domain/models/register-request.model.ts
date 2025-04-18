import { LoginRequestModel } from './login-request.model';

/**
 * Modelo de dominio para la solicitud de registro
 * Extiende el modelo de solicitud de inicio de sesión añadiendo el nombre
 */
export class RegisterRequestModel extends LoginRequestModel {
  constructor(
    public readonly name: string,
    email: string,
    password: string
  ) {
    super(email, password);
  }

  /**
   * Valida que los datos de registro sean correctos
   * Sobrescribe el método de la clase padre para incluir la validación del nombre
   */
  public override isValid(): boolean {
    return super.isValid() && !!this.name && this.name.length >= 2;
  }
}
