import { AddressModel } from "./address.model";

export class UserModel {
  _id: string = '';
  name: string;
  phone: string;
  photoUrl: string;
  parrentMaleId: number;
  parrentFemaleId: number;
  address = {
    legacy: new AddressModel(),
    current: new AddressModel()
  };
  email: string;
  googleId: string;
  role: string;

  gender: string;
  dob: Date;
  employedType: string;
  jobTitle: string;
  jobDescription: string;

  constructor(obj?: any) {
    this._id = obj?._id;
    this.name = obj?.name;
    this.phone = obj?.phone;
    this.photoUrl = obj?.photoUrl;
    this.parrentMaleId = obj?.parrentMaleId;
    this.parrentFemaleId = obj?.parrentFemaleId;
    this.address.legacy = new AddressModel(obj?.address?.legacy);
    this.address.current = new AddressModel(obj?.address?.current);
    this.email = obj?.email;
    this.googleId = obj?.googleId;
    this.role = obj?.role;
    this.gender = obj?.gender;
    this.dob = obj?.dob;
    this.employedType = obj?.employedType;
    this.jobTitle = obj?.jobTitle;
    this.jobDescription = obj?.jobDescription;
  }

  getFullAddress(type: 'legacy' | 'current') {
    const address = this.address[type];
    if (!address) return '';
    const parts = [address.houseNo, address.street, address.village, address.tehsil, address.district, address.state, address.postOffice];
    return parts.filter(part => part).join(', ');
  }
}