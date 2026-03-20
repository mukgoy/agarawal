import { Injectable } from '@angular/core';
import { ShadiProfileModel } from '../models/shadi-profile.model';
import { Observable, map } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ShaadiService {

  userList: ShadiProfileModel[] = [];
  constructor(
    private http: HttpService
  ) { }

  getProfiles(isAll=true): Observable<ShadiProfileModel[]> {
    const query = isAll ? '?all=true' : '';
    return this.http.get<ShadiProfileModel[]>('v1/shaadi/profiles'+query).pipe(
      map((data: ShadiProfileModel[]) => {
        return data.map((item: ShadiProfileModel) => new ShadiProfileModel(item));
      })
    );
  }

  getProfile(profileId: ShadiProfileModel) {
    return this.http.get(`v1/shaadi/profile/`+profileId);
  }

  createProfile(profile: ShadiProfileModel) {
    return this.http.post(`v1/shaadi/profile`, profile);
  }

  updateProfile(profile: ShadiProfileModel) {
    return this.http.patch(`v1/shaadi/profile`, profile);
  }

  deleteUser(profile: ShadiProfileModel) {
    return this.http.delete(`v1/shaadi/profile/`+profile._id);
  }
}
