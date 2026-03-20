
import * as mongoose from 'mongoose';

export const PersonalProfileSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  dob: String,
  tob: String,
  pob: String,
  city: String,
  manglik: String,
  gotra: String,
  height: String,
  weight: String,
  education: String,
  jobTitle: String,
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
});
