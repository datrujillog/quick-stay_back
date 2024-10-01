import { Injectable } from '@nestjs/common';
import { SignupAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
  ) { }



  async authSignup(signupAuthDto: SignupAuthDto) {

    const { email, password, phone, name, lastName, birthDate } = signupAuthDto;

    console.log('email', email);
    console.log('password', password);
    console.log('phone', phone);

    const results = await this.authModel.create({
      // email,
      // password,
      // phone,
      // name,
      // lastName,
      // birthDate,
      ...signupAuthDto,
      status: 'activo',
      createdAt: new Date().getTime(),
      deleted: false,
      token: 'no token',
      // token_exp: Date.now(),
    });

    return results;

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
