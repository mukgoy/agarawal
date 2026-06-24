export class AddressModel {
  
  houseNo: string;
  street: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  postOffice: string;

  constructor(obj?:any){
    this.houseNo = obj?.houseNo;
    this.street = obj?.street;
    this.village = obj?.village;
    this.tehsil = obj?.tehsil;
    this.district = obj?.district;
    this.state = obj?.state;
    this.postOffice = obj?.postOffice;
  }

}