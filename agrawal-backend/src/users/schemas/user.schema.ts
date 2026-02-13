
import * as mongoose from 'mongoose';
import { UserAddressDto } from '../dto/address.dto';



export const AddressSchema = new mongoose.Schema({
  houseNo: String,
  street: String,
  village: String,
  tehsil: String,
  district: String,
  state: String,
  postOffice: String
});

export const UserAddressSchema = new mongoose.Schema({
  legacy: AddressSchema,
  current: AddressSchema
});

export const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: UserAddressSchema
});
