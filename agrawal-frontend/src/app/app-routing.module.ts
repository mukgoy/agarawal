import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/theme/layout/layout.component';
import { UsersListComponent } from './components/pages/users/users-list/users-list.component';
import { SignupComponent } from './components/pages/auth/signup/signup.component';
import { LoginComponent } from './components/pages/auth/login/login.component';

const routes: Routes = [
  {
    path: 'auth', 
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ]
  },
  {
    path: '', 
    component: LayoutComponent, 
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
