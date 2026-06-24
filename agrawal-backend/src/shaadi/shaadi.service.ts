import { Injectable } from '@nestjs/common';
import { CreateShaadiProfileDto } from './dto/create-shaadi-profile.dto';
import { UpdateShaadiProfileDto } from './dto/update-shaadi-profile.dto';
import { ShaadiProfileModel } from './schemas/shaadi-profile.schema';

@Injectable()
export class ShaadiService {
  constructor() { }

  create(createProfileDto: CreateShaadiProfileDto, userId: string) {
    delete createProfileDto._id;
    createProfileDto.owner = userId;
    const profileModel = new ShaadiProfileModel(createProfileDto);
    return profileModel.save();
  }

  findAll(userId: string) {
    if (userId) {
      return ShaadiProfileModel.find({ owner: userId }).exec();
    }
    return ShaadiProfileModel.find().exec();
  }

  findOne(id: string) {
    return ShaadiProfileModel.findOne({ _id: id }).exec();
  }

  update(updateShaadiDto: UpdateShaadiProfileDto) {
    const id = updateShaadiDto._id;
    ShaadiProfileModel.findOneAndUpdate({ _id: id }, updateShaadiDto).exec();
    return updateShaadiDto;
  }

  remove(id: string) {
    return ShaadiProfileModel.findOneAndDelete({ _id: id }).exec();
  }
}
