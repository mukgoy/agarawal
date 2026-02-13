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
  
  constructor(public uiStore: UiStoreService) { }

  ngAfterViewInit(): void {
    this.uiStore.leftMenuRef = this.leftMenuRef;
  }
}
