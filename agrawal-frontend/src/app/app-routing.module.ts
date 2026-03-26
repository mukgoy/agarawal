import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/theme/layout/layout.component';
import { UsersListComponent } from './components/pages/users/users-list/users-list.component';
import { SignupComponent } from './components/pages/auth/signup/signup.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { ProfilesListComponent } from './components/pages/shaadi/profiles-list/profiles-list.component';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { ManageProfilesComponent } from './components/pages/shaadi/manage-profiles/manage-profiles.component';
import { EditProfileComponent } from './components/pages/shaadi/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './components/pages/shaadi/view-profile/view-profile.component';
import { GameMainComponent } from './components/games/game-main/game-main.component';
import { GameAddComponent } from './components/games/game-add/game-add.component';

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
  { path: 'profile/:profileId', component: ViewProfileComponent },
  {
    path: 'game',
    children: [
      { path: 'main', component: GameMainComponent },
      { path: 'add', component: GameAddComponent },
      { path: '**', redirectTo: 'main' },
    ]
  },
  {
    path: '', 
    component: LayoutComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'shadi', children: [
        { path: 'find-profiles', component: ProfilesListComponent },
        { path: 'manage-profiles', component: ManageProfilesComponent },
        { path: 'create-profile', component: EditProfileComponent },
        { path: 'edit-profile/:profileId', component: EditProfileComponent },
        { path: 'view-profile/:profileId', component: EditProfileComponent },
      ] },
      { path: 'members', component: UsersListComponent },
      { path: 'my-hostels', component: UsersListComponent },
      { path: 'events', component: UsersListComponent },
      { path: '**', redirectTo: 'members' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
