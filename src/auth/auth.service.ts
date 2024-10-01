import { Injectable } from '@nestjs/common';
import { SignupAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';
import { handleExceptions } from 'src/middleware/handleError.middleare';
import { comparePassword, encryptPassword } from 'src/common/encrypt/pasword.encrypt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
  ) { }



  async create(signupAuthDto: SignupAuthDto) {

    let auth: Partial<Auth>;

    try {
      let { email, password, phone, name, lastName, birthDate } = signupAuthDto;

      if (password) {
        //encriptar la contraseña
        password = await encryptPassword(password).then((hash) => {
          console.log('hash', hash);
          return hash;
        });
      }

      auth = {
        email,
        password,
        phone,
        name,
        lastName,
        birthDate,
        createdAt: new Date().getTime(),
        deleted: false,
        token: 'no token',
        // token_exp: Date.now(),
      };


      const results = await this.authModel.create({ ...auth });


      return results;


    } catch (error) {
      console.log(error);
      handleExceptions(error);

    }




    //verificarque 



    return 'This action adds a new auth';
  }


  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const user = await this.authModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    // const isPasswordValid = await encryptPassword(password) === user.password;

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generar token o cualquier otra lógica de autenticación
    return { message: 'Login successful', token: 'generated-jwt-token' };
  }



}
