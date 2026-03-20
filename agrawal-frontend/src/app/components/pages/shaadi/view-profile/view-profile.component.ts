import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NOTIFY } from 'src/app/constants/notification.constants';
import { ShadiProfileModel } from 'src/app/models/shadi-profile.model';
import { ShaadiService } from 'src/app/services/shaadi.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent {

  profile = new ShadiProfileModel();

  constructor(
    public route : ActivatedRoute,
    public shaadiService: ShaadiService,
    public util: UtilService
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe({
      next:(params)=>{
        if(!params['profileId']){ return;}
        this.shaadiService.getProfile(params['profileId']).subscribe({
          next:profile => {
            this.profile = new ShadiProfileModel(profile);
          },
          error:()=>{
            this.util.openToastr('error', NOTIFY.PROFILE_FETCH.FAILED);
          }
        });
      }
    });
  }
}
