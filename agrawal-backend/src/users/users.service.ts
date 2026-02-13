import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, ObjectId } from 'mongoose';
import { User } from './entities/user.entity';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}
  
  create(createUserDto: CreateUserDto) {
    delete createUserDto._id;
    const userModel = new this.userModel(createUserDto);
    return userModel.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findOne({_id: id}).exec();
  }

  update(updateUserDto: UpdateUserDto) {
    const userModel = new this.userModel(updateUserDto);
    return userModel.updateOne(updateUserDto);
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id: id}).exec();
  }
}
