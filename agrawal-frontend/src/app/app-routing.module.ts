import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/theme/layout/layout.component';
import { UsersListComponent } from './components/pages/users/users-list/users-list.component';
import { SignupComponent } from './components/pages/auth/signup/signup.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: 'auth', 
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ],
    canActivate: [NoAuthGuard],
  },
  {
    path: '', 
    component: LayoutComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersListComponent },
      { path: '**', component: UsersListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
