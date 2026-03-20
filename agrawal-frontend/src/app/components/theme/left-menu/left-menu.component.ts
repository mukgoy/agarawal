import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UiStoreService } from 'src/app/services/ui-store.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {

  @ViewChild('leftMenuRef') public leftMenuRef: MatSidenav | undefined;


  shaadiSubMenuItems = [
    { label: 'Find Profiles', icon: 'person_search', route: '/shadi/find-profiles' },
    { label: 'Manage Profiles', icon: 'person_edit', route: '/shadi/manage-profiles' },
    { label: 'Create Profile', icon: 'person_edit', route: '/shadi/create-profile' }
  ]
  leftMenuItems = [
    { label: 'My Profile', icon: 'person_edit', route: '/my-profile' },
    { label: 'Shadi Profiles', icon: 'favorite', subMenu:this.shaadiSubMenuItems },
    { label: 'Memebers', icon: 'people', route: '/members' },
    { label: 'My Hostels', icon: 'apartment', route: '/my-hostels' },
    { label: 'Events', icon: 'receipt_long', route: '/events' },
  ]
  
  constructor(public uiStore: UiStoreService) { }

  ngAfterViewInit(): void {
    this.uiStore.leftMenuRef = this.leftMenuRef;
  }
}
