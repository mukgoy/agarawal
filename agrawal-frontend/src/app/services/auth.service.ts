import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { tap } from 'rxjs';
import { AuthModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth = new AuthModel({} as AuthModel);

  constructor(private http: HttpService) { 
    const auth = localStorage.getItem('auth');
    this._auth = auth ? new AuthModel(JSON.parse(auth)) : this._auth;
  }

  getAuth(): AuthModel {
    return this._auth;
  }

  setAuth(auth: AuthModel) {
    this._auth = new AuthModel(auth);
    localStorage.setItem('auth', JSON.stringify(this._auth));
    return this._auth;
  }

  googleLogin(token: string) {
    return this.http.post('v1/auth/google', { token }).pipe(
      tap((response: any) => {
        return this.setAuth(response);
      })
    );
  }

  updatePhone(phone: string) {
    return this.http.post('v1/auth/updatePhone', { ...this._auth.user, phone });
  }

  isLoggedIn(): boolean {
    const token = this._auth.token;
    if(!token) return false;
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return new Date().getTime() < expiry*1000;
  }

  logout(){
    this.setAuth(new AuthModel({} as AuthModel));
  }

}
