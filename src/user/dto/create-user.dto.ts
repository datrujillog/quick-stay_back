import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

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

  //   @IsString()
  //   role: string;

  //   @IsString()
  //   status: string;

  //   created_at: Date;

  //   updated_at: Date;

  //   deleted_at: Date;

  //   deleted?: boolean;

  //   token: string;

  //   token_exp: Date;
}
