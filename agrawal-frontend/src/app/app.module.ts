import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';


import { HeaderComponent } from './components/theme/header/header.component';
import { LayoutComponent } from './components/theme/layout/layout.component';
import { LeftMenuComponent } from './components/theme/left-menu/left-menu.component';
import { BodyComponent } from './components/theme/body/body.component';
import { BreadcrumbComponent } from './components/theme/breadcrumb/breadcrumb.component';
import { TableComponent } from './components/shared/table/table.component';
import { UserComponent } from './components/dialogs/user/user.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { FormControlComponent } from './components/shared/form-control/form-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from './components/shared/form-builder/form-builder.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { SignupComponent } from './components/pages/auth/signup/signup.component';
import { UsersListComponent } from './components/pages/users/users-list/users-list.component';
import { JwtInterceptor } from './interceptors';
import { ProfilesListComponent } from './components/pages/shaadi/profiles-list/profiles-list.component';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { ManageProfilesComponent } from './components/pages/shaadi/manage-profiles/manage-profiles.component';
import { ViewProfileComponent } from './components/pages/shaadi/view-profile/view-profile.component';
import { EditProfileComponent } from './components/pages/shaadi/edit-profile/edit-profile.component';
import { SortProfileComponent } from './components/pages/shaadi/sort-profile/sort-profile.component';
import { MY_DATE_FORMATS } from './constants/app-config.constants';
import { AgePipe } from './pipes/age.pipe';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';


const matModules = [
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule, 
  MatPaginatorModule, 
  MatSortModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatExpansionModule,
  MatStepperModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    HeaderComponent,
    LayoutComponent,
    LeftMenuComponent,
    BodyComponent,
    BreadcrumbComponent,
    TableComponent,
    UserComponent,
    ConfirmComponent,
    FormControlComponent,
    FormBuilderComponent,
    LoginComponent,
    SignupComponent,
    ProfilesListComponent,
    MyProfileComponent,
    ManageProfilesComponent,
    ViewProfileComponent,
    EditProfileComponent,
    SortProfileComponent,
    AgePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),

    ...matModules
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
