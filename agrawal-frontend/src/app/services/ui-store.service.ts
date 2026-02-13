import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class UiStoreService {

  isMobile = false;
  leftMenuRef: MatSidenav | undefined;
  constructor() { }
}
