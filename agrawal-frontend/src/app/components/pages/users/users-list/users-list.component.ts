import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { DialogService } from 'src/app/services/dailog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  
  dataMap: any = {
    ID: '_id',
    Name: 'name',
    Phone: 'phone',
    Legacy: 'address.legacy.district',
    Current: 'address.current.district',
  }
  dataArr: UserModel[] = [];

  constructor(
    public dialogService: DialogService,
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((data:any) => {
      this.dataArr = data;
    });
  }

  addEditUser(data:any) { 
    this.dialogService.userDialog(data).afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    });
  }

  deleteUser(data:any) {
    console.log('deleteUser:', data);
    this.dialogService.confirmDialog('Are you sure you want to delete this application? This action cannot be undone.', 'Disclaimer', true).afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(data).subscribe((res:any) => {
          console.log('deleteUser response:', res);
          this.getUsers();
        });
      }
    });
  }
}

