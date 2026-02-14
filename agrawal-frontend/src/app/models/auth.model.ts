export const ROLES = {
    ADMIN: 'admin',
    MEMBER: 'member',
    USER: 'user'
}

export class AuthUserModel {
  _id: number = 0;
  name: string = '';
  phone: string = '';
  email: string = '';
  role: string = '';

  constructor(obj?: any) {
    this._id = obj?._id || 0;
    this.name = obj?.name || '';
    this.phone = obj?.phone || '';
    this.email = obj?.email || '';
    this.role = obj?.role || '';
  }
}

export class AuthModel {
  token: string = '';
  user: AuthUserModel = {} as AuthUserModel;

  constructor(obj?: any) {
    this.token = obj?.token || '';
    this.user = obj?.user? new AuthUserModel(obj.user) : {} as AuthUserModel;
  }
}