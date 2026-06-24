import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { employedTypeList, genderList } from 'src/app/constants/shaadi.constants';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  formFields = [
    { name: '_id', label: 'ID', type: 'text', space: 0 },
    { name: 'name', label: 'Name', type: 'text', space: 2, validators: [Validators.required]},
    { name: 'phone', label: 'Phone', type: 'text', space: 2, validators: [Validators.required]},
    { name: 'gender', label: 'Gender', type: 'select', space: 2, options: genderList.map(g => ({ label: g, value: g })), validators: [Validators.required]},
    { name: 'dob', label: 'Date of Birth', type: 'date', space: 2},
    { name: 'employedType', label: 'Employment Type', type: 'select', space: 2, options: employedTypeList.map(g => ({ label: g, value: g }))},
    { name: 'jobTitle', label: 'Job/Occupation Title', type: 'text', space: 2, placeholder:"e.g. Software Engineer (TCS) or Balaji General Store"},
    { name: 'jobDescription', label: 'Job/Occupation Description', type: 'textarea', space: 2, placeholder:"e.g. Software Engineer (TCS) or Grocery, Furniture business, Kids readymade garments, etc."},
  ];
  legacyFields = [
    { name: 'village', label: 'Village', type: 'text', space: 2 },
    { name: 'tehsil', label: 'Tehsil', type: 'text', space: 2, validators: [Validators.required]},
    { name: 'district', label: 'District', type: 'text', space: 2, validators: [Validators.required]},
    { name: 'postOffice', label: 'Post Office', type: 'text', space: 2 },
  ];
  currentFields = [
    { name: 'houseNo', label: 'HouseNo', type: 'text', space: 2 },
    { name: 'street', label: 'Street', type: 'text', space: 2, validators: [Validators.required]},
    { name: 'district', label: 'District', type: 'text', space: 2, validators: [Validators.required]},
    { name: 'postOffice', label: 'Post Office', type: 'text', space: 2 },
  ];

  userForm: FormGroup = new FormGroup({});
  legacyForm: FormGroup = new FormGroup({});
  currentForm: FormGroup = new FormGroup({});

  constructor(
    private cd: ChangeDetectorRef,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngAfterViewInit() {
    console.log('Dialog data:', this.data);
    if (this.data.data._id) {
      this.userForm.patchValue(this.data.data);
      this.legacyForm.patchValue(this.data.data.address.legacy);
      this.currentForm.patchValue(this.data.data.address.current);
    }
    this.cd.detectChanges();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    const userData = new UserModel({
      ...this.userForm.value,
      address: {
        legacy: this.legacyForm.value,
        current: this.currentForm.value,
      }
    });


    const req = this.data.data._id
      ? this.userService.updateUser(userData)
      : this.userService.createUser(userData);

    req.subscribe({
      next: (res) => {
        // console.log('User updated successfully:', res);
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.error('Error updating user:', err);
      }
    });
  }

}
