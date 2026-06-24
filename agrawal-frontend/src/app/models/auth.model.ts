import { UserModel } from "./user.model";

export const ROLES = {
    ADMIN: 'admin',
    MEMBER: 'member',
    USER: 'user'
}


export class AuthModel {
  token: string = '';
  user: UserModel = {} as UserModel;

  constructor(obj?: any) {
    this.token = obj?.token || '';
    this.user = obj?.user? new UserModel(obj.user) : {} as UserModel;
  }
}