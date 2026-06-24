import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, ObjectId } from 'mongoose';
import { User } from './entities/user.entity';
import { Types } from 'mongoose';
import { UserModel } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(  ) {}
  
  create(createUserDto: CreateUserDto) {
    delete createUserDto._id;
    const userModel = new UserModel(createUserDto);
    return userModel.save();
  }

  findAll(): Promise<any[]> {
    return UserModel.find().exec();
  }

  findOne(id: string) {
    return UserModel.findOne({_id: new Types.ObjectId(id)}).exec();
  }

  async update(updateUserDto: UpdateUserDto) {
    return await UserModel.updateOne(
      {_id: new Types.ObjectId(updateUserDto._id)},
      {$set: updateUserDto}
    ).exec();
  }

  async remove(id: string) {
    return await UserModel.deleteOne({_id: new Types.ObjectId(id)}).exec();
  }
}
