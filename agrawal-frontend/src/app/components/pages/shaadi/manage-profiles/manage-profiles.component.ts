import { Component } from '@angular/core';
import { ShadiProfileModel } from 'src/app/models/shadi-profile.model';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { ShaadiService } from 'src/app/services/shaadi.service';

@Component({
  selector: 'app-manage-profiles',
  templateUrl: './manage-profiles.component.html',
  styleUrls: ['./manage-profiles.component.scss']
})
export class ManageProfilesComponent {
  profiles: ShadiProfileModel[] = [];
  constructor(
    private breadcrumbService: BreadcrumbService,
    public shaadiService: ShaadiService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb('findProfiles');
    this.getProfiles();
  }

  getProfiles() {
    return this.shaadiService.getProfiles(false).subscribe((profiles) => {
      this.profiles = profiles;
    });
  }
} 
