import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomSpinnerService {

  public counter = new BehaviorSubject<number>(0);
  constructor() { }
  show(isLoader:boolean = true) {
    if(isLoader)
      this.counter.next(this.counter.value + 1);
  }

  hide(isLoader:boolean = true) {
    if(isLoader)
      this.counter.next(this.counter.value > 0 ? this.counter.value - 1 : 0);
  }

}
