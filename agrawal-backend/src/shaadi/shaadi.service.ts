import { Inject, Injectable } from '@nestjs/common';
import { CreateShaadiProfileDto } from './dto/create-shaadi-profile.dto';
import { UpdateShaadiProfileDto } from './dto/update-shaadi-profile.dto';
import { Model } from 'mongoose';
// import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ShaadiService {
  constructor(
    @Inject('SHAADI_PROFILE_MODEL')
    private profileModel: Model<any>,
  ) {}
  
  create(createProfileDto: CreateShaadiProfileDto, userId: string) {
    delete createProfileDto._id;
    createProfileDto.owner = userId;
    const profileModel = new this.profileModel(createProfileDto);
    return profileModel.save();
  }

  findAll(userId: string): Promise<CreateShaadiProfileDto[]> {
    if (userId) {
      return this.profileModel.find({owner: userId}).exec();
    }
    return this.profileModel.find().exec();
  }

  findOne(id: string) {
    return this.profileModel.findOne({_id: id}).exec();
  }

  update(updateShaadiDto: UpdateShaadiProfileDto) {
    const id = updateShaadiDto._id;
    this.profileModel.updateOne({_id: id}, updateShaadiDto).exec();
    return updateShaadiDto
  }

  remove(id: string) {
    return this.profileModel.deleteOne({_id: id}).exec();
  }
}
