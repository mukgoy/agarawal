import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  list = {
    home: {
      title: 'Overview',
      url: '/admin/home',
      parents: []
    },
    myProfile: {
      title: 'My Profile',
      url: '/my-profile',
      parents: ['home']
    },
    members: {
      title: 'Members',
      url: '/members',
      parents: ['home']
    },
    findProfiles: {
      title: 'Find Profiles',
      url: '/find-profiles',
      parents: ['home']
    },
    manageProfiles: {
      title: 'Manage Profiles',
      url: '/manage-profiles',
      parents: ['home']
    },
  }
  breadcrumbs: Array<any> = [];
  constructor() { }

  setBreadcrumb(currentPage: keyof typeof this.list) {
    this.breadcrumbs = [];
    this.list[currentPage].parents.forEach((parentKey: string ) => {
      const key = parentKey as keyof typeof this.list;
      this.breadcrumbs.push(this.list[key]);
    });
    this.breadcrumbs.push(this.list[currentPage]);
  }

}
