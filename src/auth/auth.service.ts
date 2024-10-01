import { Injectable } from '@nestjs/common';
import { SignupAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';
import { handleExceptions } from 'src/middleware/handleError.middleare';
import { encryptPassword } from 'src/common/encrypt/pasword.encrypt';

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





  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
