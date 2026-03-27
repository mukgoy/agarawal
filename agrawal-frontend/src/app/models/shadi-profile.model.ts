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
    this.fname = obj?.fname || '';
    this.lname = obj?.lname || '';
    this.gender = obj?.gender || '';
    this.rashi = obj?.rashi || '';
    this.dob = obj?.dob || '';
    this.tob = obj?.tob || '';
    this.pob = obj?.pob || '';
    this.city = obj?.city || '';
    this.manglik = obj?.manglik || '';
    this.gotra = obj?.gotra || '';
    this.height = obj?.height || '';
    this.weight = obj?.weight || '';
    this.education = obj?.education || '';
    this.jobTitle = obj?.jobTitle || '';
    this.income = obj?.income || '';
    this.employedType = obj?.employedType || '';

    this.maritalStatus = obj?.maritalStatus || '';
    this.physicalStatus = obj?.physicalStatus || '';

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
    this.fatherName = obj?.fatherName || '';
    this.fatherOccupation = obj?.fatherOccupation || '';
    this.motherName = obj?.motherName || '';
    this.motherOccupation = obj?.motherOccupation || '';
    this.brothersCount = obj?.brothersCount || '';
    this.sistersCount = obj?.sistersCount || '';
  }

}
export class ContactDetailModel {

  phone = '';
  email = '';
  address = '';

  constructor(obj?: any) {
    this.phone = obj?.phone || '';
    this.email = obj?.email || '';
    this.address = obj?.address || '';
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