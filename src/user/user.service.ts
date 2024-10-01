import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { handleExceptions } from 'src/middleware/handleError.middleare';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) { }

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
    const users = this.userModel.find().exec();
    return users;
  }

  async findOne(userId: string) {


    if (isValidObjectId(userId)) {

      const user = await this.userModel.findById(userId).exec();

      if (!user) {
        throw new NotFoundException(`Usuario no existe`);
      }

      return user;
    }

    throw new NotFoundException(`User with id ${userId} not found`);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const userDB = await this.findOne(id);

    if (!userDB) {
      throw new NotFoundException(`Usuario no existe`);
    }

    const user = await this.userModel.updateOne({ _id: id }, { ...updateUserDto });

    return user;
  }

  async remove(userId: string) {


    const { deletedCount } = await this.userModel.deleteOne({ _id: userId }).exec();

    if (deletedCount === 0) {
      throw new NotFoundException(`Usuario no existe`);
    }

    console.log(deletedCount);
    return { message: 'Usuario eliminado' };
  }
}
