import { Component } from '@angular/core';
import { ShadiProfileModel } from 'src/app/models/shadi-profile.model';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { ShaadiService } from 'src/app/services/shaadi.service';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent {

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
    return this.shaadiService.getProfiles().subscribe((profiles) => {
      this.profiles = profiles;
    });
  }

}
