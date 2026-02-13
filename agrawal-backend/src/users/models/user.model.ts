import { AddressModel } from "./address.model";

export class UserModel {
  id: number = 0;
  name: string = '';
  phone: string = '';
  parrentMaleId: number = 0;
  parrentFemaleId: number = 0;
  address = {
    legacy: new AddressModel(),
    current: new AddressModel()
  }

  constructor(obj?: any) {
    this.id = obj?.id || 0;
    this.name = obj?.name || '';
    this.phone = obj?.phone || '';
    this.parrentMaleId = obj?.parrentMaleId || 0;
    this.parrentFemaleId = obj?.parrentFemaleId || 0;
    this.address.legacy = new AddressModel(obj?.address?.legacy);
    this.address.current = new AddressModel(obj?.address?.current);
  }
}