import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { NOTIFY } from 'src/app/constants/notification.constants';
import { genderList, gotraList, rashiList } from 'src/app/constants/shaadi.constants';
import { ShadiProfileModel } from 'src/app/models/shadi-profile.model';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { ShaadiService } from 'src/app/services/shaadi.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  @ViewChild('stepper') stepper!: MatStepper;
  
  personalFields = [
    { name: 'fname', label: 'First Name', type: 'text', space: 2, validators: [Validators.required]},
    { name: 'lname', label: 'Last Name', type: 'text', space: 2, validators: [Validators.required]},
    { name: 'gender', label: 'Gender', type: 'select', space: 2, options: genderList.map(g => ({ label: g, value: g })), validators: [Validators.required]},
    { name: 'rashi', label: 'Rashi', type: 'select', space: 2, options: rashiList.map(g => ({ label: g, value: g }))},
    { name: 'dob', label: 'Date of Birth', type: 'date', space: 2},
    { name: 'tob', label: 'Time of Birth', type: 'text', space: 2, placeholder: 'e.g. 9:30 a.m'},
    { name: 'pob', label: 'Place of Birth', type: 'text', space: 2, placeholder:"e.g. New Delhi"},
    { name: 'city', label: 'Current City', type: 'text', space: 2, placeholder:"e.g. New Delhi"},
    { name: 'manglik', label: 'Manglik', type: 'text', space: 2, placeholder:"No"},
    { name: 'gotra', label: 'Gotra', type: 'select', space: 2, options: gotraList.map(g => ({ label: g, value: g }))},
    { name: 'height', label: 'Height', type: 'text', space: 2, placeholder: 'e.g. 5 feet 7 inches'},
    { name: 'weight', label: 'Weight', type: 'text', space: 2, placeholder: 'e.g. 60 kg'},
    { name: 'education', label: 'Education', type: 'text', space: 2, placeholder:"e.g. B.Tech (IIT Kanpur)"},
    { name: 'jobTitle', label: 'Job/Occupation', type: 'text', space: 2, placeholder:"e.g. Software Engineer (TCS)"}
  ];
  familyFields = [
    { name: 'fatherName', label: "Father's Name", type: 'text', space: 2},
    { name: 'fatherOccupation', label: "Father's Occupation", type: 'text', space: 2},
    { name: 'motherName', label: "Mother's Name", type: 'text', space: 2},
    { name: 'motherOccupation', label: "Mother's Occupation", type: 'text', space: 2},
    { name: 'brothersCount', label: "No. Of Brother", type: 'text', space: 2},
    { name: 'sistersCount', label: "No. Of Sister", type: 'text', space: 2},
  ];
  contactFields = [
    { name: 'phone', label: "Contact Number", type: 'text', space: 2, placeholder:"e.g. 9876543210, 9876543210"},
    { name: 'email', label: "Email", type: 'text', space: 2, placeholder:"e.g. abc@gmail.com"},
    { name: 'address', label: "Address", type: 'textarea', space: 1},
  ];
  personalForm: FormGroup = new FormGroup({});
  familyForm: FormGroup = new FormGroup({});
  contactForm: FormGroup = new FormGroup({});

  profile = new ShadiProfileModel();

  constructor(
    public router: Router,
    public route : ActivatedRoute,
    public shaadiService: ShaadiService,
    public cloudinaryService: CloudinaryService,
    public util: UtilService
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe({
      next:(params)=>{
        if(!params['profileId']){ return;}
        this.shaadiService.getProfile(params['profileId']).subscribe({
          next:profile => {
            this.profile = new ShadiProfileModel(profile);
            this.personalForm.patchValue(this.profile.personal);
            this.familyForm.patchValue(this.profile.family);
            this.contactForm.patchValue(this.profile.contact);
          },
          error:()=>{
            this.util.openToastr('error', NOTIFY.PROFILE_FETCH.FAILED);
          }
        });
      }
    });
  }

  submit(navigate=false) {
    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      return;
    }

    this.submitProfile().subscribe({
      next: (res:any) => {
        this.util.openToastr('success', NOTIFY.PROFILE_SAVE.SUCCESS);
        this.profile = new ShadiProfileModel(res);
        this.stepper.next();
        if(navigate){
          this.router.navigate(['/shadi/manage-profiles']);
        }
      },
      error: (err) => {
        this.util.openToastr('error', NOTIFY.PROFILE_SAVE.FAILED);
      }
    });
  }

  submitProfile() {
    this.profile.personal = this.personalForm.value;
    this.profile.family = this.familyForm.value;
    this.profile.contact = this.contactForm.value;

    if(this.profile._id){
      return this.shaadiService.updateProfile(this.profile)
    }else{
      return this.shaadiService.createProfile(this.profile)
    }
  }

  uploadImage(event: any){
    this.cloudinaryService.uploadImage(event). subscribe({
      next:(res:any)=>{
        this.util.openToastr('success', NOTIFY.IMAGE_UPLOAD.SUCCESS);
        this.profile.images.push(res.url);
        this.submit(true);
      },
      error:()=>{
        this.util.openToastr('error', NOTIFY.IMAGE_UPLOAD.FAILED);
      }
    });
  }
}
