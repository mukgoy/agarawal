import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortProfileComponent } from './sort-profile.component';

describe('SortProfileComponent', () => {
  let component: SortProfileComponent;
  let fixture: ComponentFixture<SortProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortProfileComponent]
    });
    fixture = TestBed.createComponent(SortProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
