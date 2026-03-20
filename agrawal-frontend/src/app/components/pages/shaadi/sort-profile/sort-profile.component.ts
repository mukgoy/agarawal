import { Component, Input } from '@angular/core';
import { ShadiProfileModel } from 'src/app/models/shadi-profile.model';
import { DialogService } from 'src/app/services/dailog.service';
import { ShaadiService } from 'src/app/services/shaadi.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-sort-profile',
  templateUrl: './sort-profile.component.html',
  styleUrls: ['./sort-profile.component.scss']
})
export class SortProfileComponent {

  @Input() profiles!: ShadiProfileModel[];

  constructor(
    public shaadiService: ShaadiService,
    private dialog: DialogService,
    private util: UtilService,
  ) { }


  deleteProfile(profile: ShadiProfileModel) {
    this.dialog.confirmDialog('Are you sure you want to delete this profile?', 'Delete Profile', true)  
    .afterClosed().subscribe((result) => { 
      if(result) {
        this.shaadiService.deleteUser(profile).subscribe(() => {
          this.util.reloadCurrentRoute();
        });
      }
    });
  }


}
