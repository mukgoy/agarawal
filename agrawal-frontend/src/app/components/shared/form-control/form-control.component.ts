import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

export type FormControlType = 'text' | 'select' | 'date' | 'textarea' | 'file' | 'checkbox' | 'radio';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent {

  @Input() formGroup: FormGroup = {} as FormGroup;
  @Input() controlName: string = '';
  @Input() type: string = 'text';
  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() data: Array<any> = [];
  @Input() minDate: Date | string = '';
  @Input() maxDate: Date | string = new Date();
  @Input() multiple: boolean = false;
  @Input() readonly: boolean = false;

  @Output() dateChange = new EventEmitter<string | Date>();
  
  control:any;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.control = this.formGroup.get(this.controlName);
  }
  ngOnInit(): void { }

  haserror(){
    return this.control && this.control.errors && (this.control.dirty || this.control.touched)
  }

  DateChange(type: string, event: any) {
    this.dateChange.emit(event.value)
  }
}
