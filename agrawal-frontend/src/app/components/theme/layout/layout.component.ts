import { Component, HostListener } from '@angular/core';
import { UiStoreService } from 'src/app/services/ui-store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(public uiStore: UiStoreService) { }

  ngOnInit(): void {
    this.onResize(new Event('resize'));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth < 768) {
      this.uiStore.isMobile = true;
    } else {
      this.uiStore.isMobile = false;
    }
  }
  

}
