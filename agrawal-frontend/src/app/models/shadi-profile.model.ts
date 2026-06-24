export class PersonalDetailModel {

  fname = '';
  lname = '';
  gender: 'Male'|'Female' = 'Male';
  rashi = '';
  dob = '';
  tob = '';
  pob = '';
  city = '';
  manglik = '';
  gotra = '';
  height = '';
  weight = '';

  education = '';
  jobTitle = '';
  income = '';
  employedType = '';

  maritalStatus = '';
  physicalStatus = '';


  constructor(obj?: any) {
    this.fname = obj?.fname?.toString() || '';
    this.lname = obj?.lname?.toString() || '';
    this.gender = obj?.gender?.toString() || '';
    this.rashi = obj?.rashi?.toString() || '';
    this.dob = obj?.dob?.toString() || '';
    this.tob = obj?.tob?.toString() || '';
    this.pob = obj?.pob?.toString() || '';
    this.city = obj?.city?.toString() || '';
    this.manglik = obj?.manglik?.toString() || '';
    this.gotra = obj?.gotra?.toString() || '';
    this.height = obj?.height?.toString() || '';
    this.weight = obj?.weight?.toString() || '';
    this.education = obj?.education?.toString() || '';
    this.jobTitle = obj?.jobTitle?.toString() || '';
    this.income = obj?.income?.toString() || '';
    this.employedType = obj?.employedType?.toString() || '';

    this.maritalStatus = obj?.maritalStatus?.toString() || '';
    this.physicalStatus = obj?.physicalStatus?.toString() || '';

  }

}
export class FamilyDetailModel {

  fatherName = '';
  fatherOccupation = '';
  motherName = '';
  motherOccupation = '';
  brothersCount = '';
  sistersCount = '';

  constructor(obj?: any) {
    this.fatherName = obj?.fatherName?.toString() || '';
    this.fatherOccupation = obj?.fatherOccupation?.toString() || '';
    this.motherName = obj?.motherName?.toString() || '';
    this.motherOccupation = obj?.motherOccupation?.toString() || '';
    this.brothersCount = obj?.brothersCount?.toString() || '';
    this.sistersCount = obj?.sistersCount?.toString() || '';
  }

}
export class ContactDetailModel {

  phone = '';
  email = '';
  address = '';

  constructor(obj?: any) {
    this.phone = obj?.phone?.toString() || '';
    this.email = obj?.email?.toString() || '';
    this.address = obj?.address?.toString() || '';
  }

}

export class ShadiProfileModel {
  _id: number = 0;
  owner: number = 0;
  personal = new PersonalDetailModel();
  family = new FamilyDetailModel();
  contact = new ContactDetailModel();
  images: string[] = [];


  constructor(obj?: any) {
    this._id = obj?._id || 0;
    this.owner = obj?.owner || 0;
    this.personal = new PersonalDetailModel(obj?.personal);
    this.family = new FamilyDetailModel(obj?.family);
    this.contact = new ContactDetailModel(obj?.contact);
    this.images = obj?.images || [];
    
  }
}