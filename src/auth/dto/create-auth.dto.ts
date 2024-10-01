import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class SignupAuthDto {


    @IsString()
    phone: string;

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(3)
    lastName: string;

    @IsString()
    birthDate: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, {
        message:
            'La contraseña es demasiado corta. Debe tener al menos 8 caracteres.',
    })
    @MaxLength(20, {
        message:
            'La contraseña es demasiado larga. Debe tener como máximo 20 caracteres.',
    })
    password: string;



}
