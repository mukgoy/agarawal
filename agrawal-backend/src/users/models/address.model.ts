export class AddressModel {
  
  houseNo = '';
  street = '';
  village = '';
  tehsil = '';
  district = '';
  state = '';
  postOffice = '';

  constructor(obj?:any){
    this.houseNo = obj?.houseNo || '';
    this.street = obj?.street || '';
    this.village = obj?.village || '';
    this.tehsil = obj?.tehsil || '';
    this.district = obj?.district || '';
    this.state = obj?.state || '';
    this.postOffice = obj?.postOffice || '';
  }

}