import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable, map, of } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: UserModel[] = [];
  constructor(
    private http: HttpService
  ) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('v1/users').pipe(
      map((data: UserModel[]) => {
        return data.map((item: UserModel) => new UserModel(item));
      })
    );
  }

  createUser(user: UserModel) {
    return this.http.post(`v1/users`, user);
  }

  updateUser(user: UserModel) {
    return this.http.patch(`v1/users`, user);
  }

  deleteUser(user: UserModel) {
    return this.http.delete(`v1/users/`+user._id);
  }


}
