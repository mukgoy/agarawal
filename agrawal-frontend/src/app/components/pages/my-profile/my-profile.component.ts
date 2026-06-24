import { Component } from '@angular/core';
import { NOTIFY } from 'src/app/constants/notification.constants';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { DialogService } from 'src/app/services/dailog.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {

  constructor(
    private breadcrumbService: BreadcrumbService,
    private dialogService: DialogService,
    private userService: UserService,
    private authService: AuthService,
    private cloudinaryService: CloudinaryService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb("myProfile");
    this.getUser();
  }

  getUser(){
    const userId = this.authService.getUserId();
    this.userService.getUser(userId).subscribe((data:any) => {
      this.userService.myProfile = data;
    });
  }

  editUser() { 
    this.dialogService.userDialog(this.userService.myProfile).afterClosed().subscribe(result => {
      if (result) {
        this.getUser();
      }
    });
  }

  get myProfile() {
    return this.userService.myProfile;
  }

  uploadImage(event: any){
      this.cloudinaryService.uploadImage(event). subscribe({
        next:(res:any)=>{
          const userData = new UserModel({
            _id: this.userService.myProfile._id,
            photoUrl: res.secure_url
          });
          this.userService.updateUser(userData).subscribe(() => {
            this.util.openToastr('success', NOTIFY.IMAGE_UPLOAD.SUCCESS);
            this.getUser();
          });
        },
        error:()=>{
          this.util.openToastr('error', NOTIFY.IMAGE_UPLOAD.FAILED);
        }
      });
    }

}
