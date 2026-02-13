import { Component } from '@angular/core';
import { UiStoreService } from 'src/app/services/ui-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(public uiStore: UiStoreService) { } 
    
}
