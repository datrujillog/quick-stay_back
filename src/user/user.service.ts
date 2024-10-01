import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { handleExceptions } from 'src/middleware/handleError.middleare';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create({
        ...createUserDto,
        status: 'activo',
        createdAt: Date.now(),
        deleted: false,
        token: 'no token',
        // token_exp: Date.now(),
      });
      return user;
    } catch (error) {
      console.log(error);
      handleExceptions(error);
    }
  }

  findAll() {
    const users = this.userModel.find();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
