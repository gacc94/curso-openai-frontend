import { Injectable } from '@angular/core';
import { UserModel } from '../../domain/models/user.model';

/**
 * Mapper para convertir entre diferentes representaciones de usuario
 */
@Injectable({
    providedIn: 'root',
})
export class UserMapper {
    /**
     * Convierte un objeto de datos a un modelo de dominio UserModel
     */
    toUserModel(data: any): UserModel {
        return new UserModel(data.id, data.email, data.name, data.photoURL, data.provider);
    }

    /**
     * Convierte un modelo de dominio UserModel a un objeto DTO
     */
    toUserDto(user: UserModel): any {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            photoURL: user.photoURL,
            provider: user.provider,
        };
    }
}
