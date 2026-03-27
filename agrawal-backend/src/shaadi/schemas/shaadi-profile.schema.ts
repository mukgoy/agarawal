
import * as mongoose from 'mongoose';
import { auditPlugin } from 'src/audit/audit.plugin';

export const PersonalProfileSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  gender: String,
  rashi: String,
  dob: String,
  tob: String,
  pob: String,
  city: String,
  manglik: String,
  gotra: String,
  height: Number,
  weight: Number,
  education: String,
  jobTitle: String,
  income: String,
  employedType: String,
  maritalStatus: String,
  physicalStatus: String,

});

export const FamilyProfileSchema = new mongoose.Schema({
  fatherName: String,
  fatherOccupation: String,
  motherName: String,
  motherOccupation: String,
  brothersCount: String,
  sistersCount: String,
});

export const ContactProfileSchema = new mongoose.Schema({
  phone: String,
  email: String,
  address: String,
});

export const ShaadiProfileSchema = new mongoose.Schema({
  owner: String,
  personal: PersonalProfileSchema,
  family: FamilyProfileSchema,
  contact: ContactProfileSchema,
  images: [String],
},{
  timestamps: true
});

ShaadiProfileSchema.plugin(auditPlugin)