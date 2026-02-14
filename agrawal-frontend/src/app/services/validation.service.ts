import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config: any = {
      required: 'Required',
      invalidCreditCard: 'Is invalid credit card number',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      invalidPhoneNumber: 'Invalid phone number. Must be 10 digits.'
    };

    return config[validatorName];
  }

  static booleanOnly(control: FormControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-1]+(\.?[0-1]+)?$/)) return { 'invalidBoolean': true };

    return null;
  }

  static creditCardValidator(control: FormControl) {
    if (
      control.value.match(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
      )
    ) {
      return null;
    } else {
      return { invalidCreditCard: true };
    }
  }

  static emailValidator(control: FormControl) {
    if (
      (control.value || "").match(
        /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static phoneValidator(control: FormControl) {
    // Validate phone number (10 digits)
    if ((control.value || "").match(/^\d{10}$/)) {
      return null;
    } else {
      return { invalidPhoneNumber: 'Invalid phone number. Must be 10 digits.' };
    }
  }

  static numericOnly(control: FormControl) {//all should be number
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

    return null;
  }

  static linksOnly(control: FormControl) {//all should be links
    let val = control.value
    if (val === null || val === '') return null;
    const urlRegex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
    const result = val.match(urlRegex);
    if (!val.match(urlRegex)) return { 'invalidUrl': true };
    return null;
  }

  static addressOnly(control: FormControl) {//all should be links
    let val = control.value
    if (val === null || val === '') return null;
    const urlRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    const result = val.match(urlRegex);
    if (!val.match(urlRegex)) return { 'invalidAddress': true };
    return null;
  }

  static characterOnly(control: FormControl) {//all should be number
    let val = control.value;
    if (val === null || val === '') return null;

    if (!(/^[a-zA-Z ]+$/.test(val))) return { 'invalidCharacter': true };

    return null;
  }

  static MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  static mustHasNumber(control: FormControl) {//atleast one chat should be number 
    let val = control.value;
    if (val === null || val === '') return null;
    if (!(/\d/g.test(control.value))) {
      return { 'mustHasNumber': true }
    }
    return null;
  }

  static mustHasLowerChar(control: FormControl) {
    let val = control.value;
    if (val === null || val === '') return null;
    if (!(/[a-z]/g.test(control.value))) {
      return { 'mustHasLowerChar': true }
    }
    return null;
  }

  static mustHasUpperChar(control: FormControl) {
    let val = control.value;
    if (val === null || val === '') return null;
    if (!(/[A-Z]/g.test(control.value))) {
      return { 'mustHasUpperChar': true }
    }
    return null;
  }

  static mustHasSpecialChar(control: FormControl) {
    let val = control.value;
    if (val === null || val === '') return null;
    if (!(/[!@#\$%\^\&*\)\(+=._-]+/g.test(control.value))) {
      return { 'mustHasSpecialChar': true }
    }
    return null;
  }

  static required(control: FormControl) {
    const isWhitespace = (control.value?.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'required': true };
  }

  static getError(form: AbstractControl): any {
    if (form instanceof FormGroup) {
      let formErrors: any = {};
      Object.keys(form.controls).forEach(key => {
        let control = form.get(key);
        if (control) {
          formErrors[key] = this.getError(control)
        }
      });
      return formErrors
    }
    if (form instanceof FormControl) {
      return { errors: form.errors };
    }
    if (form instanceof FormArray) {
      let arrayErr: any = [];
      form?.controls?.forEach(e => {
        arrayErr.push(this.getError(e));
      });
      return arrayErr
    }
  }

  static noFutureDate(control: AbstractControl) {
    const today = new Date().getTime();
    if (!(control && control.value)) {
      return null;
    }
    let value = new Date(control.value);
    return value.getTime() > today
      ? { invalidDate: 'You cannot use future dates' }
      : null;
  }

  static dateNoMoreThan(controlName: string, compareControlName: string, fieldTitle: string) {
    // https://stackoverflow.com/questions/40377103/how-to-convert-date-into-this-yyyy-mm-dd-format-in-angular-2
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[compareControlName];

      if (matchingControl.errors && !matchingControl.errors['dateNoMoreThan']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      let matchingdate = new Date(matchingControl.value)
      matchingdate.setDate(matchingdate.getDate() + 1);
      // BM 9-22-23 An empty value should not trigger the validations
      if (control.value && new Date(control.value) < new Date(matchingdate)) {
        control.setErrors({ dateNoMoreThan: 'Date should be more than ' + fieldTitle });
      } else {
        delete control.errors?.['dateNoMoreThan'];
      }
    }
  }

  static numericWithDecimalOnly(decimalPlaces=5) { //all should be number
    return function (control: FormControl) {
      let val = control.value;
      if (val === null || val === '') return null;
      var regexp = new RegExp(`^\\d+(\\.\\d{1,${decimalPlaces}})?$`);
      if (!regexp.test(val)) return { 'invalidNumber': true, limit: decimalPlaces };
      return null;
    }
  }

  static InputcleanValidation(control: FormControl) {//all should be number
    let value = control.value;
    value = ValidationService.InputcleanPipe(value);
    if (control.value !== value) {
      control.patchValue(value);
    }
    return null;
  }

  static yearRangeValidator(control: FormControl) {
    const value = control.value;
    if (!value) return null;
    // Check pattern YYYY-YYYY
    const regex = /^\d{4}-\d{4}$/;
    if (!regex.test(value)) {
      return { errorText: "Invalid format, Use YYYY-YYYY" };
    }
    const [start, end] = value.split('-').map(Number);
    // Check valid years and range
    if (start > end) {
      return { errorText: "Start year must be less than or equal to end year" };
    }
    return null;
  }

  static InputcleanPipe(value: any) {
    if (typeof value === 'string') {
      value = value.replace(/[^\x00-\x7F]/g, ' ');
      value = value.replace(/\\u([0-9A-Fa-f]{4})*/g, '\n');
      value = value.replace(/%(?![0-9A-Fa-f]{2})[^\s%]*/g, ' ');
      value = value.replace(/\\t/g, '    ').replace(/\\n/g, '\n');
      value = ValidationService.replaceHtmlEntites(value);
    }
    return value
  }

  static replaceHtmlEntites(s: string) {
    const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    const translate: any = {
      "nbsp": " ",
      "amp": "&",
      "quot": "\"",
      "lt": "<",
      "gt": ">"
    };
    return s.replace(translate_re, function (match: any, entity: any) {
      return translate[entity];
    });

  }
}

