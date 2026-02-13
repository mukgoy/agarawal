import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControlType } from '../form-control/form-control.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent {

  @Input() formFields: Array<{ name: string, label: string, type: string, required: boolean, space:number }> = [];

  @Input() formGroup: FormGroup = {} as FormGroup;
  @Output() formGroupChange = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.buildForm();
    this.formGroupChange.emit(this.formGroup);//emit to make two way binding
  }

  buildForm(): FormGroup {
    const group: any = {};
    this.formFields.forEach(field => {
      group[field.name] = field.required ? ['', Validators.required] : [''];
    });
    return this.fb.group(group);
  }
  
}
