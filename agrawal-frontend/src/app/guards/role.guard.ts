import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { USER_ROLES } from '../enums/user.enum';
import { ROLES_BY_USER_TYPE } from '../enums/ui.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    public userService: UserService,
    public authService: AuthService,
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.userService.getUser();
    if(user && user.selectedSiteRole){
      let isAllow = (route.data['roles'] || []).includes(user.selectedSiteRole.RoleName.toUpperCase());
      if(isAllow){
        return true;
      }
      let isEduAgent = this.userService.isEduAgent();
      let home = isEduAgent ? '/edu-agent/home' : '/app';
      this.router.navigate([home]);
    }else{
      localStorage.clear();
      window.location.href = '/';
    }
    // window.location.href = '/app/auth/login';
    return false;
  }
  
}
