import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum UserRole {
  Anfitrion = 'anfitrion',
  Huesped = 'huesped',
  Admin = 'admin',
}

enum UserStatus {
  Activo = 'activo',
  Inactivo = 'inactivo',
}

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop({
    required: true,
    enum: Object.values(UserRole), // solo puede ser uno de los valores de UserRole
    default: UserRole.Huesped,
  })
  role: UserRole;

  @Prop()
  status: UserStatus;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_at: Date;

  @Prop()
  deleted?: boolean; // es para saber si el usuario fue eliminado o no

  @Prop()
  token: string;

  @Prop()
  token_exp: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
