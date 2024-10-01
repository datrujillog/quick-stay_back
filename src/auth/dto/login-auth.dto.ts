import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, {
        message: 'La contraseña es demasiado corta. Debe tener al menos 8 caracteres.',
    })
    @MaxLength(20, {
        message: 'La contraseña es demasiado larga. Debe tener como máximo 20 caracteres.',
    })
    password: string;
}